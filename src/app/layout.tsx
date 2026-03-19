import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ subsets: ['latin'], variable: '--font-poppins', weight: ['400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  title: 'TECHNOULTRA | Generador de Propuestas',
  description: 'Sistema interno premium para propuestas de alto valor comercial.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body className={`${inter.className} bg-neutral-50 text-neutral-900 antialiased selection:bg-brand selection:text-white`}>
        {children}
      </body>
    </html>
  )
}
