// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Document } from "@langchain/core/documents";
import { VectorStore } from "@langchain/core/vectorstores";
import { Embeddings } from "@langchain/core/embeddings";
import * as fs from 'fs';
import path from 'path'; // Para manejo de rutas seguro en Windows

// --- 1. VECTOR STORE PERSONALIZADO (Solución para Windows) ---
class SimpleMemoryVectorStore extends VectorStore {
  private vectors: { content: string, embedding: number[], metadata: any }[] = [];

  _vectorstoreType(): string { return "simple_memory"; }

  constructor(embeddings: Embeddings) { super(embeddings, {}); }

  async addVectors(vectors: number[][], documents: Document[]): Promise<void> {
    vectors.forEach((vec, i) => {
      this.vectors.push({
        content: documents[i].pageContent,
        embedding: vec,
        metadata: documents[i].metadata,
      });
    });
  }

  async addDocuments(documents: Document[]): Promise<void> {
    const texts = documents.map((d) => d.pageContent);
    const embeddings = await this.embeddings.embedDocuments(texts);
    await this.addVectors(embeddings, documents);
  }

  async similaritySearchVectorWithScore(query: number[], k: number): Promise<[Document, number][]> {
    const results = this.vectors.map((vec) => {
      const similarity = this.cosineSimilarity(query, vec.embedding);
      return { ...vec, score: similarity };
    });
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, k).map((r) => [
      new Document({ pageContent: r.content, metadata: r.metadata }),
      r.score,
    ]);
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
}

// --- 2. CONFIGURACIÓN DE MODELOS ---
const llm = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-flash", // Modelo estable y rápido
  apiKey: process.env.GEMINI_API_KEY,
  maxOutputTokens: 2048,
});

const embeddings = new GoogleGenerativeAIEmbeddings({
  modelName: "text-embedding-004", // Modelo de embeddings actualizado
  apiKey: process.env.GEMINI_API_KEY,
});

// Caché para no recargar el archivo en cada pregunta
let vectorStoreInstance: SimpleMemoryVectorStore | null = null;

const getVectorStore = async () => {
  if (vectorStoreInstance) return vectorStoreInstance;

  // Ruta absoluta robusta para desarrollo local
  const filePath = path.join(process.cwd(), "data", "john_reyna_resume.txt");
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Resume file not found at: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const docs = [new Document({ pageContent: fileContent })];

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 100,
  });
  
  const splitDocs = await textSplitter.splitDocuments(docs);
  const store = new SimpleMemoryVectorStore(embeddings);
  await store.addDocuments(splitDocs);
  
  vectorStoreInstance = store;
  return store;
};

// --- 3. MANEJADOR POST (API ENDPOINT) ---
export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question) return NextResponse.json({ error: "No question provided" }, { status: 400 });
    if (!process.env.GEMINI_API_KEY) return NextResponse.json({ error: "API Key missing" }, { status: 500 });

    const vectorStore = await getVectorStore();
    
    // Búsqueda manual de contexto
    const contextDocs = await vectorStore.similaritySearch(question, 3);
    const context = contextDocs.map(d => d.pageContent).join("\n\n");

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", `You are John Reyna's professional AI Agent. Use the following pieces of context to answer the user's question. 
      If you don't know the answer, just say that you don't know, don't try to make up an answer.
      Respond in a professional and concise manner.
      
      Context:
      {context}`],
      ["human", "{question}"],
    ]);

    const chain = prompt.pipe(llm).pipe(new StringOutputParser());

    const result = await chain.invoke({
      context: context,
      question: question,
    });

    return NextResponse.json({ answer: result });
    
  } catch (error: any) {
    console.error("AI Error Details:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}