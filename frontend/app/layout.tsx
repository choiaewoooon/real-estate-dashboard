import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Real Estate Analysis Dashboard',
  description: '부동산 데이터 분석 및 시장 트렌드 대시보드',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>© 2024 Real Estate Dashboard. 실시간 부동산 데이터 분석 플랫폼</p>
          </footer>
        </div>
      </body>
    </html>
  )
}