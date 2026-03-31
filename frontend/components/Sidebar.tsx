'use client'

import { 
  FiHome, 
  FiTrendingUp, 
  FiDollarSign, 
  FiMap, 
  FiBarChart2, 
  FiPieChart,
  FiFilter,
  FiSettings,
  FiDownload,
  FiShare2
} from 'react-icons/fi'
import { useState } from 'react'

const menuItems = [
  { icon: <FiHome />, label: '대시보드', active: true },
  { icon: <FiTrendingUp />, label: '시장 트렌드', active: false },
  { icon: <FiDollarSign />, label: '가격 예측', active: false },
  { icon: <FiMap />, label: '지역 분석', active: false },
  { icon: <FiBarChart2 />, label: '통계 분석', active: false },
  { icon: <FiPieChart />, label: '유형 분포', active: false },
]

const filterOptions = [
  { label: '아파트', count: 45 },
  { label: '오피스텔', count: 25 },
  { label: '단독주택', count: 18 },
  { label: '다세대주택', count: 12 },
]

const priceRanges = [
  { label: '1억 미만', count: 15 },
  { label: '1억~3억', count: 35 },
  { label: '3억~5억', count: 28 },
  { label: '5억 이상', count: 22 },
]

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState('대시보드')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter))
    } else {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
      {/* 메뉴 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">메뉴</h2>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveMenu(item.label)}
              className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-colors ${
                activeMenu === item.label
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* 필터 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">필터</h2>
          <FiFilter className="w-5 h-5 text-gray-500" />
        </div>
        
        {/* 부동산 유형 */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">부동산 유형</h3>
          <div className="space-y-2">
            {filterOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => toggleFilter(option.label)}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm ${
                  selectedFilters.includes(option.label)
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <span>{option.label}</span>
                <span className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 가격대 */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">가격대</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => toggleFilter(range.label)}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm ${
                  selectedFilters.includes(range.label)
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <span>{range.label}</span>
                <span className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">
                  {range.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="space-y-3">
        <button className="flex items-center justify-center space-x-2 w-full btn-primary">
          <FiDownload />
          <span>데이터 내보내기</span>
        </button>
        
        <button className="flex items-center justify-center space-x-2 w-full btn-secondary">
          <FiShare2 />
          <span>공유하기</span>
        </button>
        
        <button className="flex items-center justify-center space-x-2 w-full btn-secondary">
          <FiSettings />
          <span>설정</span>
        </button>
      </div>

      {/* 통계 요약 */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">요약</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">총 매물</span>
            <span className="font-medium">100개</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">평균 가격</span>
            <span className="font-medium">3.2억원</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">최근 거래</span>
            <span className="font-medium">24시간 내</span>
          </div>
        </div>
      </div>
    </aside>
  )
}