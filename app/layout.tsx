import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'John Reyna | Digital Product, E-Commerce & Web Operations',
  description: '15+ years driving digital shopping experiences, e-commerce product operations, dynamic pricing & promotions, and cross-functional delivery.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body suppressHydrationWarning className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  )
}