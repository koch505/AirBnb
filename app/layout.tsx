import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/navbar'
import RegisterModal from './components/modals/RegisterModal'
import { Toaster } from 'react-hot-toast'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en"> 
      <body className={inter.className}>
        <Toaster />
        <LoginModal />
        <RentModal />
        <RegisterModal />
        <Navbar 
          currentUser={currentUser}
        />
        {children}
        </body>
    </html>
  )
}
