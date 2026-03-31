'use client'

import { ReactNode } from 'react'
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi'

interface StatCardProps {
  title: string
  value: string
  icon: ReactNode
  trend?: {
    value: number
    positive: boolean
  }
  description?: string
}

export default function StatCard({ title, value, icon, trend, description }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
        <div className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-sm">
          {icon}
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center space-x-2">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${
            trend.positive 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
          }`}>
            {trend.positive ? (
              <FiTrendingUp className="w-4 h-4" />
            ) : (
              <FiTrendingDown className="w-4 h-4" />
            )}
            <span>{trend.value}%</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {trend.positive ? '전월 대비 증가' : '전월 대비 감소'}
          </span>
        </div>
      )}
    </div>
  )
}