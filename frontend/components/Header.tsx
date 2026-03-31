'use client'

import { useState } from 'react'
import { FiHome, FiTrendingUp, FiDollarSign, FiMap, FiBell, FiUser } from 'react-icons/fi'

export default function Header() {
  const [notifications, setNotifications] = useState(3)

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FiHome className="w-8 h-8 text-primary-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Real Estate Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">부동산 시장 분석 플랫폼</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-1 ml-8">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiTrendingUp />
              <span>시장 트렌드</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiDollarSign />
              <span>가격 예측</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiMap />
              <span>지역 분석</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <FiBell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          
          <div className="hidden sm:flex items-center space-x-3 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
            <FiUser className="w-5 h-5" />
            <div>
              <p className="text-sm font-medium">김부동</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">부동산 분석가</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="text-sm font-medium">실시간</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">데이터 업데이트</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  )
}