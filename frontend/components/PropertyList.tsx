'use client'

import { FiHome, FiMapPin, FiDollarSign, FiMaximize2 } from 'react-icons/fi'

interface Property {
  id: number
  address: string
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  property_type: string
}

interface PropertyListProps {
  properties: Property[]
}

export default function PropertyList({ properties }: PropertyListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getPropertyTypeColor = (type: string) => {
    switch (type) {
      case '아파트':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case '오피스텔':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case '단독주택':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      case '다세대주택':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-8">
        <FiHome className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">등록된 매물이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">주소</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">유형</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">가격</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">면적</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">구성</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">상세</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr 
              key={property.id} 
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="py-4 px-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                    <FiMapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{property.address}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ID: #{property.id}</p>
                  </div>
                </div>
              </td>
              
              <td className="py-4 px-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPropertyTypeColor(property.property_type)}`}>
                  {property.property_type}
                </span>
              </td>
              
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <FiDollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(property.price)}
                  </span>
                </div>
              </td>
              
              <td className="py-4 px-4">
                <div className="text-gray-900 dark:text-white font-medium">
                  {property.area}㎡
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  약 {Math.round(property.area / 3.3058)}평
                </div>
              </td>
              
              <td className="py-4 px-4">
                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-white">{property.bedrooms}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">침실</div>
                  </div>
                  <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-white">{property.bathrooms}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">욕실</div>
                  </div>
                </div>
              </td>
              
              <td className="py-4 px-4">
                <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <FiMaximize2 className="w-4 h-4" />
                  <span>상세보기</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}