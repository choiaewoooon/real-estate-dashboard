'use client'

import { useEffect, useState } from 'react'
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiHome,
  FiMapPin,
  FiCalendar
} from 'react-icons/fi'
import MarketTrendChart from '../components/MarketTrendChart'
import PropertyList from '../components/PropertyList'
import PricePredictionForm from '../components/PricePredictionForm'
import StatCard from '../components/StatCard'

interface DashboardStats {
  totalProperties: number
  averagePrice: number
  medianPrice: number
  propertyTypeDistribution: Record<string, number>
  priceByType: Record<string, number>
}

interface Property {
  id: number
  address: string
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  property_type: string
}

// 샘플 데이터 - 백엔드 없이 작동
const sampleProperties: Property[] = [
  { id: 1, address: '서울 강남구 1번지', price: 350000000, area: 84, bedrooms: 3, bathrooms: 2, property_type: '아파트' },
  { id: 2, address: '서울 서초구 15번지', price: 280000000, area: 66, bedrooms: 2, bathrooms: 1, property_type: '오피스텔' },
  { id: 3, address: '서울 송파구 32번지', price: 420000000, area: 98, bedrooms: 4, bathrooms: 2, property_type: '아파트' },
  { id: 4, address: '서울 마포구 8번지', price: 320000000, area: 72, bedrooms: 3, bathrooms: 2, property_type: '아파트' },
  { id: 5, address: '경기 성남시 45번지', price: 180000000, area: 55, bedrooms: 2, bathrooms: 1, property_type: '다세대주택' },
  { id: 6, address: '경기 과천시 12번지', price: 390000000, area: 88, bedrooms: 3, bathrooms: 2, property_type: '아파트' },
  { id: 7, address: '서울 강남구 27번지', price: 450000000, area: 105, bedrooms: 4, bathrooms: 3, property_type: '단독주택' },
  { id: 8, address: '서울 서초구 3번지', price: 310000000, area: 68, bedrooms: 3, bathrooms: 2, property_type: '오피스텔' },
  { id: 9, address: '서울 송파구 19번지', price: 265000000, area: 62, bedrooms: 2, bathrooms: 1, property_type: '아파트' },
  { id: 10, address: '서울 마포구 22번지', price: 295000000, area: 70, bedrooms: 3, bathrooms: 2, property_type: '아파트' },
]

const sampleStats: DashboardStats = {
  totalProperties: 100,
  averagePrice: 325000000,
  medianPrice: 320000000,
  propertyTypeDistribution: {
    '아파트': 45,
    '오피스텔': 25,
    '단독주택': 18,
    '다세대주택': 12
  },
  priceByType: {
    '아파트': 350000000,
    '오피스텔': 280000000,
    '단독주택': 420000000,
    '다세대주택': 180000000
  }
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 백엔드 API 호출 대신 샘플 데이터 사용
    setTimeout(() => {
      setStats(sampleStats)
      setProperties(sampleProperties)
      setLoading(false)
    }, 500)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">부동산 분석 대시보드</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          실시간 부동산 시장 데이터와 트렌드 분석
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="총 매물 수"
          value={stats?.totalProperties?.toString() || '0'}
          icon={<FiHome className="w-6 h-6" />}
          trend={{ value: 12, positive: true }}
          description="전체 등록된 부동산"
        />
        
        <StatCard
          title="평균 가격"
          value={stats?.averagePrice ? formatCurrency(stats.averagePrice) : '0'}
          icon={<FiDollarSign className="w-6 h-6" />}
          trend={{ value: 5.2, positive: true }}
          description="전체 평균 거래 가격"
        />
        
        <StatCard
          title="중위 가격"
          value={stats?.medianPrice ? formatCurrency(stats.medianPrice) : '0'}
          icon={<FiTrendingUp className="w-6 h-6" />}
          trend={{ value: 3.8, positive: true }}
          description="가격 분포 중간값"
        />
        
        <StatCard
          title="아파트 평균"
          value={stats?.priceByType?.['아파트'] ? formatCurrency(stats.priceByType['아파트']) : '0'}
          icon={<FiMapPin className="w-6 h-6" />}
          trend={{ value: 7.1, positive: true }}
          description="아파트 유형 평균"
        />
      </div>

      {/* 차트와 예측 폼 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 시장 트렌드 차트 */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">시장 트렌드</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">월간 평균 가격</span>
              <FiCalendar className="w-4 h-4 text-gray-500" />
            </div>
          </div>
          <div className="h-80">
            <MarketTrendChart />
          </div>
        </div>

        {/* 가격 예측 폼 */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">가격 예측</h2>
          <PricePredictionForm />
        </div>
      </div>

      {/* 최근 매물 리스트 */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">최근 매물</h2>
          <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
            전체 보기 →
          </button>
        </div>
        <PropertyList properties={properties} />
      </div>

      {/* 유형 분포 */}
      {stats?.propertyTypeDistribution && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">부동산 유형 분포</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.propertyTypeDistribution).map(([type, count]) => (
              <div key={type} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">{type}</span>
                  <span className="text-primary-600 dark:text-primary-400 font-bold">{count}개</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(count / (stats?.totalProperties || 1)) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {((count / (stats?.totalProperties || 1)) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 시장 인사이트 */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">시장 인사이트</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <FiTrendingUp className="w-5 h-5 text-green-500" />
              <span className="font-medium">상승 추세</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              최근 3개월간 아파트 평균 가격이 5.2% 상승했으며, 이는 전년 동기 대비 높은 성장률입니다.
            </p>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <FiMapPin className="w-5 h-5 text-blue-500" />
              <span className="font-medium">인기 지역</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              강남구와 서초구가 가장 높은 거래량을 기록하며, 평균 가격도 다른 지역보다 15% 높습니다.
            </p>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <FiCalendar className="w-5 h-5 text-purple-500" />
              <span className="font-medium">계절적 변동</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              봄철(3-5월)에 거래량이 가장 높으며, 겨울철에는 20% 정도 감소하는 패턴이 관찰됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}