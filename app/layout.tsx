import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/navbar'
import Modal from './components/modals/Modal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"> 
      <body className={inter.className}>
        <Modal 
          isOpen 
          title='Hello world'
          actionLabel='Submit'
          />
        <Navbar />
        {children}
        </body>
    </html>
  )
}
