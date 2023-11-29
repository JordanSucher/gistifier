import { Inter } from 'next/font/google'
import './globals.css'
import Header from './ui/Header'
import Sidenav from './ui/Sidenav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + ' flex flex-col bg-gray-100'}>
        <Header />
        <div className={`flex grow w-full`}>
          <Sidenav />
          <div className='py-3 px-1 pr-20 w-full h-full flex flex-col'>
            {children}
          </div>
        </div>

      </body>
    </html>
  )
}
