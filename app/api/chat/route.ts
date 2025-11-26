// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { Document } from "@langchain/core/documents";
import { VectorStore } from "@langchain/core/vectorstores"; // Clase base estable
import { Embeddings } from "@langchain/core/embeddings";
import * as fs from 'fs';

// --- 1. IMPLEMENTACIÓN DE VECTOR STORE PERSONALIZADO (Pure JS) ---
// Esto reemplaza a HNSWLib y MemoryVectorStore para evitar errores de compilación en Windows.
class SimpleMemoryVectorStore extends VectorStore {
  private vectors: { content: string, embedding: number[], metadata: any }[] = [];

  _vectorstoreType(): string {
    return "simple_memory";
  }

  constructor(embeddings: Embeddings) {
    super(embeddings, {});
  }

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
    // Calculamos la Similitud de Coseno manualmente
    const results = this.vectors.map((vec) => {
      const similarity = this.cosineSimilarity(query, vec.embedding);
      return { ...vec, score: similarity };
    });

    // Ordenamos por mayor similitud y devolvemos los top k
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

// --- CONFIGURACIÓN DE CACHÉ GLOBAL ---
declare global {
  var vectorStore: SimpleMemoryVectorStore | undefined;
}

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash", 
  apiKey: process.env.GEMINI_API_KEY,
  maxOutputTokens: 2048,
});

// --- 2. FUNCIÓN DE CARGA (Usando nuestra clase personalizada) ---
const getVectorStore = async () => {
  if (global.vectorStore) return global.vectorStore;

  const filePath = "data/john_reyna_resume.txt";
  if (!fs.existsSync(filePath)) throw new Error("Resume file not found");

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const docs = [new Document({ pageContent: fileContent })];

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splitDocs = await textSplitter.splitDocuments(docs);

  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "embedding-001",
    apiKey: process.env.GEMINI_API_KEY,
  });
  
  // Instanciamos nuestro store personalizado
  const vectorStore = new SimpleMemoryVectorStore(embeddings);
  await vectorStore.addDocuments(splitDocs);
  
  global.vectorStore = vectorStore;
  return vectorStore;
};

const formatDocumentsAsString = (documents: any[]) => {
  return documents.map((document) => document.pageContent).join("\n\n");
};

// --- 3. MANEJADOR API ---
export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question) return NextResponse.json({ error: "No question provided" }, { status: 400 });
    if (!process.env.GEMINI_API_KEY) return NextResponse.json({ error: "API Key not found" }, { status: 500 });

    const vectorStore = await getVectorStore();
    const retriever = vectorStore.asRetriever();

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", `You are John Reyna's professional AI Agent. Answer the user's question ONLY based on the context provided below. 
      If the answer is not in the context, state that you don't have enough information. Do not invent facts.
      
      Context:
      {context}`],
      ["human", "{question}"],
    ]);

    const ragChain = RunnableSequence.from([
      {
        context: retriever.pipe(formatDocumentsAsString),
        question: new RunnablePassthrough(),
      },
      prompt,
      llm,
      new StringOutputParser(),
    ]);

    const result = await ragChain.invoke(question);

    return NextResponse.json({ answer: result });
    
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}