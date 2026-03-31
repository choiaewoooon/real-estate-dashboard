from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
from typing import List, Optional

app = FastAPI(title="Real Estate Analysis API", version="1.0.0")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 데이터 모델
class PropertyData(BaseModel):
    id: int
    address: str
    price: int
    area: float
    bedrooms: int
    bathrooms: int
    year_built: int
    location_score: float
    transaction_date: str
    property_type: str

class PricePredictionRequest(BaseModel):
    area: float
    bedrooms: int
    bathrooms: int
    location_score: float
    property_type: str

class MarketTrend(BaseModel):
    date: str
    average_price: float
    transaction_count: int

# 샘플 데이터 생성 함수
def generate_sample_properties(count=100):
    properties = []
    property_types = ["아파트", "오피스텔", "단독주택", "다세대주택"]
    cities = ["서울 강남구", "서울 서초구", "서울 송파구", "서울 마포구", "경기 성남시", "경기 과천시"]
    
    start_date = datetime(2023, 1, 1)
    
    for i in range(count):
        property_type = random.choice(property_types)
        area = random.uniform(20, 200)
        bedrooms = random.randint(1, 5)
        bathrooms = random.randint(1, 3)
        location_score = random.uniform(3.0, 5.0)
        
        # 가격 계산 (기본 공식)
        base_price = area * 1000  # 평당 1000만원
        price = int(base_price * (1 + (bedrooms - 1) * 0.1) * (1 + (bathrooms - 1) * 0.05) * location_score)
        price += random.randint(-5000, 5000) * 10  # 랜덤 변동
        
        # 거래일자
        days_offset = random.randint(0, 365)
        transaction_date = (start_date + timedelta(days=days_offset)).strftime("%Y-%m-%d")
        
        properties.append({
            "id": i + 1,
            "address": f"{random.choice(cities)} {random.randint(1, 100)}번지",
            "price": price,
            "area": round(area, 1),
            "bedrooms": bedrooms,
            "bathrooms": bathrooms,
            "year_built": random.randint(1990, 2023),
            "location_score": round(location_score, 1),
            "transaction_date": transaction_date,
            "property_type": property_type
        })
    
    return properties

# 샘플 시장 트렌드 데이터 생성
def generate_market_trends():
    trends = []
    start_date = datetime(2023, 1, 1)
    
    for i in range(12):  # 12개월 데이터
        date = (start_date + timedelta(days=i*30)).strftime("%Y-%m")
        base_price = 30000 + i * 500  # 상승 추세
        volatility = random.uniform(-0.1, 0.1)
        average_price = int(base_price * (1 + volatility))
        transaction_count = random.randint(50, 150)
        
        trends.append({
            "date": date,
            "average_price": average_price,
            "transaction_count": transaction_count
        })
    
    return trends

# 전역 데이터
properties_data = generate_sample_properties(100)
market_trends_data = generate_market_trends()

@app.get("/")
async def root():
    return {"message": "Real Estate Analysis API", "version": "1.0.0"}

@app.get("/api/properties", response_model=List[PropertyData])
async def get_properties(
    limit: int = 20,
    offset: int = 0,
    property_type: Optional[str] = None,
    min_price: Optional[int] = None,
    max_price: Optional[int] = None
):
    """부동산 매물 데이터 조회"""
    filtered = properties_data
    
    if property_type:
        filtered = [p for p in filtered if p["property_type"] == property_type]
    if min_price:
        filtered = [p for p in filtered if p["price"] >= min_price]
    if max_price:
        filtered = [p for p in filtered if p["price"] <= max_price]
    
    return filtered[offset:offset+limit]

@app.get("/api/properties/{property_id}")
async def get_property(property_id: int):
    """특정 부동산 매물 상세 조회"""
    for prop in properties_data:
        if prop["id"] == property_id:
            return prop
    raise HTTPException(status_code=404, detail="Property not found")

@app.get("/api/statistics")
async def get_statistics():
    """부동산 통계 데이터"""
    df = pd.DataFrame(properties_data)
    
    stats = {
        "total_properties": len(properties_data),
        "average_price": int(df["price"].mean()),
        "median_price": int(df["price"].median()),
        "min_price": int(df["price"].min()),
        "max_price": int(df["price"].max()),
        "average_area": float(df["area"].mean()),
        "property_type_distribution": df["property_type"].value_counts().to_dict(),
        "price_by_type": df.groupby("property_type")["price"].mean().to_dict()
    }
    
    return stats

@app.get("/api/market-trends", response_model=List[MarketTrend])
async def get_market_trends():
    """시장 트렌드 데이터"""
    return market_trends_data

@app.post("/api/predict-price")
async def predict_price(request: PricePredictionRequest):
    """부동산 가격 예측"""
    # 간단한 선형 회귀 모델 (실제 모델 대신 샘플)
    base_price = request.area * 1000
    price = base_price * (1 + (request.bedrooms - 1) * 0.1) * (1 + (request.bathrooms - 1) * 0.05) * request.location_score
    
    # 부동산 유형별 가중치
    type_multipliers = {
        "아파트": 1.2,
        "오피스텔": 1.0,
        "단독주택": 1.3,
        "다세대주택": 0.9
    }
    
    multiplier = type_multipliers.get(request.property_type, 1.0)
    predicted_price = int(price * multiplier)
    
    # 신뢰구간 (예측 오차)
    confidence_interval = {
        "lower": int(predicted_price * 0.9),
        "upper": int(predicted_price * 1.1)
    }
    
    return {
        "predicted_price": predicted_price,
        "confidence_interval": confidence_interval,
        "features": {
            "area": request.area,
            "bedrooms": request.bedrooms,
            "bathrooms": request.bathrooms,
            "location_score": request.location_score,
            "property_type": request.property_type
        }
    }

@app.get("/api/regions")
async def get_regions():
    """지역별 통계"""
    regions = {}
    for prop in properties_data:
        region = prop["address"].split()[0]  # 첫 번째 단어가 지역
        if region not in regions:
            regions[region] = {
                "count": 0,
                "total_price": 0,
                "properties": []
            }
        regions[region]["count"] += 1
        regions[region]["total_price"] += prop["price"]
        regions[region]["properties"].append(prop["id"])
    
    # 평균 가격 계산
    result = []
    for region, data in regions.items():
        result.append({
            "region": region,
            "property_count": data["count"],
            "average_price": int(data["total_price"] / data["count"]),
            "sample_properties": data["properties"][:3]
        })
    
    return sorted(result, key=lambda x: x["average_price"], reverse=True)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)