'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend
} from 'recharts'

interface MarketTrend {
  date: string
  average_price: number
  transaction_count: number
}

export default function MarketTrendChart() {
  const [trends, setTrends] = useState<MarketTrend[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrends()
  }, [])

  const fetchTrends = async () => {
    try {
      const response = await axios.get('/api/market-trends')
      setTrends(response.data)
    } catch (error) {
      console.error('Error fetching market trends:', error)
      // 샘플 데이터 (에러 시)
      const sampleData: MarketTrend[] = [
        { date: '2023-01', average_price: 32000, transaction_count: 85 },
        { date: '2023-02', average_price: 32500, transaction_count: 92 },
        { date: '2023-03', average_price: 32800, transaction_count: 105 },
        { date: '2023-04', average_price: 33200, transaction_count: 98 },
        { date: '2023-05', average_price: 33500, transaction_count: 112 },
        { date: '2023-06', average_price: 34000, transaction_count: 108 },
        { date: '2023-07', average_price: 34500, transaction_count: 95 },
        { date: '2023-08', average_price: 35000, transaction_count: 102 },
        { date: '2023-09', average_price: 35500, transaction_count: 115 },
        { date: '2023-10', average_price: 36000, transaction_count: 110 },
        { date: '2023-11', average_price: 36500, transaction_count: 105 },
        { date: '2023-12', average_price: 37000, transaction_count: 120 },
      ]
      setTrends(sampleData)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">평균 가격: </span>
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                {formatCurrency(payload[0].value)}
              </span>
            </p>
            <p className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">거래량: </span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {payload[1].value}건
              </span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">차트 데이터 로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={trends}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
        <XAxis 
          dataKey="date" 
          stroke="#9CA3AF"
          fontSize={12}
        />
        <YAxis 
          stroke="#9CA3AF"
          fontSize={12}
          tickFormatter={(value) => `${value / 10000}억`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Area
          type="monotone"
          dataKey="average_price"
          name="평균 가격 (만원)"
          stroke="#3B82F6"
          fill="url(#colorPrice)"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="transaction_count"
          name="거래량 (건)"
          stroke="#10B981"
          fill="url(#colorTransactions)"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  )
}