import './globals.css'

export const metadata = {
  title: 'John Reyna | Digital Product, E-Commerce & Web Operations',
  description: '10+ years driving digital shopping experiences, e-commerce product operations, dynamic pricing & promotions, and cross-functional delivery.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  )
}