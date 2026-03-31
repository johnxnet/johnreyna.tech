import './globals.css'

export const metadata = {
  title: 'John Reyna | Digital Platform Specialist',
  description: 'Professional Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}