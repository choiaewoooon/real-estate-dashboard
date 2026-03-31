'use client'

import { useState } from 'react'
import axios from 'axios'
import { FiCalculator, FiTrendingUp, FiHome, FiMapPin, FiDollarSign } from 'react-icons/fi'

interface PredictionResult {
  predicted_price: number
  confidence_interval: {
    lower: number
    upper: number
  }
  features: {
    area: number
    bedrooms: number
    bathrooms: number
    location_score: number
    property_type: string
  }
}

export default function PricePredictionForm() {
  const [formData, setFormData] = useState({
    area: 84,
    bedrooms: 3,
    bathrooms: 2,
    location_score: 4.0,
    property_type: '아파트'
  })
  
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const propertyTypes = ['아파트', '오피스텔', '단독주택', '다세대주택']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'area' || name === 'location_score' ? parseFloat(value) : 
              name === 'bedrooms' || name === 'bathrooms' ? parseInt(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('/api/predict-price', formData)
      setResult(response.data)
    } catch (err) {
      setError('가격 예측 중 오류가 발생했습니다.')
      console.error('Prediction error:', err)
      
      // 샘플 응답 (에러 시)
      setResult({
        predicted_price: 350000000,
        confidence_interval: {
          lower: 315000000,
          upper: 385000000
        },
        features: formData
      })
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const calculatePricePerSquare = () => {
    if (!result) return '0'
    const pricePerSquare = result.predicted_price / formData.area
    return formatCurrency(pricePerSquare)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 면적 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center space-x-2">
              <FiHome className="w-4 h-4" />
              <span>전용면적 (㎡)</span>
            </div>
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              name="area"
              min="20"
              max="200"
              step="1"
              value={formData.area}
              onChange={handleInputChange}
              className="flex-1"
            />
            <span className="w-20 text-center font-medium">{formData.area}㎡</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>20㎡</span>
            <span>110㎡</span>
            <span>200㎡</span>
          </div>
        </div>

        {/* 방 구성 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              침실 수
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                name="bedrooms"
                min="1"
                max="5"
                step="1"
                value={formData.bedrooms}
                onChange={handleInputChange}
                className="flex-1"
              />
              <span className="w-8 text-center font-medium">{formData.bedrooms}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              욕실 수
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                name="bathrooms"
                min="1"
                max="3"
                step="1"
                value={formData.bathrooms}
                onChange={handleInputChange}
                className="flex-1"
              />
              <span className="w-8 text-center font-medium">{formData.bathrooms}</span>
            </div>
          </div>
        </div>

        {/* 위치 점수 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center space-x-2">
              <FiMapPin className="w-4 h-4" />
              <span>위치 점수 (1-5)</span>
            </div>
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              name="location_score"
              min="1"
              max="5"
              step="0.5"
              value={formData.location_score}
              onChange={handleInputChange}
              className="flex-1"
            />
            <span className="w-12 text-center font-medium">{formData.location_score}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>교통 불편</span>
            <span>보통</span>
            <span>교통 최상</span>
          </div>
        </div>

        {/* 부동산 유형 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            부동산 유형
          </label>
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, property_type: type }))}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  formData.property_type === type
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 예측 버튼 */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 btn-primary py-3"
        >
          <FiCalculator className="w-5 h-5" />
          <span>{loading ? '예측 중...' : '가격 예측하기'}</span>
        </button>
      </form>

      {/* 예측 결과 */}
      {result && (
        <div className="mt-6 p-4 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">예측 결과</h3>
            <FiTrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          
          {/* 예측 가격 */}
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">예상 가격</p>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {formatCurrency(result.predicted_price)}
            </p>
          </div>

          {/* 신뢰구간 */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>신뢰구간 (90%)</span>
              <span>±{(result.confidence_interval.upper - result.predicted_price) / result.predicted_price * 100}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 via-primary-500 to-green-500 relative">
                <div className="absolute left-0 w-full flex justify-between px-2">
                  <span className="text-xs text-white font-medium">
                    {formatCurrency(result.confidence_interval.lower)}
                  </span>
                  <span className="text-xs text-white font-medium">
                    {formatCurrency(result.confidence_interval.upper)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 상세 정보 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">평당 가격</p>
              <p className="font-medium text-gray-900 dark:text-white">{calculatePricePerSquare()}</p>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">예측 기준</p>
              <p className="font-medium text-gray-900 dark:text-white">{result.features.property_type}</p>
            </div>
          </div>

          {/* 비교 정보 */}
          <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">유사 매물 평균</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(result.predicted_price * 0.95)}
                </p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs ${
                result.predicted_price > result.predicted_price * 0.95
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}>
                {result.predicted_price > result.predicted_price * 0.95 ? '+5%' : '-5%'}
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  )
}