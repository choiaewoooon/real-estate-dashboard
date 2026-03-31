# 부동산 분석 대시보드 (Real Estate Analysis Dashboard)

실시간 부동산 시장 데이터 분석 및 예측 플랫폼

## ✨ 주요 기능

- **실시간 시장 트렌드 분석**: 월별 평균 가격 및 거래량 추이 시각화
- **부동산 가격 예측**: AI 기반 가격 예측 모델 (면적, 위치, 구성 등 기반)
- **지역별 통계 분석**: 지역별 평균 가격 및 거래량 비교
- **부동산 매물 조회**: 필터링 및 검색 기능 제공
- **대시보드 통계**: 주요 지표 실시간 모니터링

## 🏗️ 기술 스택

### 백엔드 (FastAPI)
- Python 3.11+
- FastAPI (REST API)
- Pydantic (데이터 검증)
- Pandas & NumPy (데이터 분석)
- Uvicorn (ASGI 서버)

### 프론트엔드 (Next.js)
- Next.js 14 (React 프레임워크)
- TypeScript
- Tailwind CSS (스타일링)
- Recharts (데이터 시각화)
- Axios (HTTP 클라이언트)

## 🚀 시작하기

### 1. 저장소 클론
```bash
git clone https://github.com/[username]/real-estate-dashboard.git
cd real-estate-dashboard
```

### 2. 백엔드 설정
```bash
cd backend

# 가상환경 생성 및 활성화 (선택사항)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 또는 venv\Scripts\activate  # Windows

# 의존성 설치
pip install -r requirements.txt

# 서버 실행
python run.py
# 또는
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

백엔드 서버는 http://localhost:8000 에서 실행됩니다.
- API 문서: http://localhost:8000/docs
- 대체 문서: http://localhost:8000/redoc

### 3. 프론트엔드 설정
```bash
cd frontend

# 의존성 설치
npm install
# 또는
yarn install

# 개발 서버 실행
npm run dev
# 또는
yarn dev
```

프론트엔드 서버는 http://localhost:3000 에서 실행됩니다.

## 📁 프로젝트 구조

```
real-estate-dashboard/
├── backend/
│   ├── main.py              # FastAPI 앱 메인 파일
│   ├── requirements.txt     # Python 의존성
│   └── run.py              # 서버 실행 스크립트
├── frontend/
│   ├── app/                # Next.js 앱 디렉토리
│   │   ├── page.tsx        # 메인 페이지
│   │   ├── layout.tsx      # 레이아웃
│   │   └── globals.css     # 전역 스타일
│   ├── components/         # React 컴포넌트
│   │   ├── Header.tsx      # 헤더 컴포넌트
│   │   ├── Sidebar.tsx     # 사이드바 컴포넌트
│   │   ├── MarketTrendChart.tsx  # 시장 트렌드 차트
│   │   ├── PricePredictionForm.tsx  # 가격 예측 폼
│   │   ├── PropertyList.tsx  # 매물 리스트
│   │   └── StatCard.tsx    # 통계 카드
│   ├── package.json        # Node.js 의존성
│   ├── tailwind.config.js  # Tailwind 설정
│   └── next.config.js      # Next.js 설정
└── README.md              # 프로젝트 문서
```

## 🔧 API 엔드포인트

### 부동산 데이터
- `GET /api/properties` - 부동산 매물 목록 조회
- `GET /api/properties/{id}` - 특정 매물 상세 조회
- `GET /api/statistics` - 통계 데이터
- `GET /api/market-trends` - 시장 트렌드 데이터
- `GET /api/regions` - 지역별 통계

### 가격 예측
- `POST /api/predict-price` - 부동산 가격 예측

## 🌐 배포 가이드

### Vercel 배포 (프론트엔드)
1. Vercel에 로그인
2. GitHub 저장소 연결
3. 빌드 설정:
   - 프레임워크: Next.js
   - 루트 디렉토리: `frontend`
   - 빌드 명령: `npm run build`
   - 출력 디렉토리: `.next`

### Railway/Render 배포 (백엔드)
1. Railway 또는 Render에 프로젝트 연결
2. 환경 변수 설정:
   - `PORT=8000`
3. 시작 명령: `python main.py`

### 환경 변수
```env
# 백엔드
DATABASE_URL=postgresql://user:pass@localhost:5432/real_estate
API_KEY=your_api_key

# 프론트엔드
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📊 데이터 소스

프로젝트는 샘플 데이터를 사용하며, 실제 데이터 연동을 위해 다음 API를 활용할 수 있습니다:

1. **공공데이터포털 부동산 실거래가 API**
2. **KB부동산 시세 API**
3. **다음/네이버 부동산 API**
4. **사용자 정의 데이터베이스**

## 🔄 개발 가이드

### 새로운 기능 추가
1. 백엔드 API 엔드포인트 추가 (`backend/main.py`)
2. 프론트엔드 컴포넌트 생성 (`frontend/components/`)
3. 페이지에 컴포넌트 통합 (`frontend/app/page.tsx`)
4. API 연동 및 상태 관리

### 스타일 커스터마이징
- Tailwind CSS 클래스 활용
- `frontend/tailwind.config.js`에서 테마 확장
- 컴포넌트별 CSS 모듈 사용

## 🧪 테스트

### 백엔드 테스트
```bash
cd backend
python -m pytest tests/
```

### 프론트엔드 테스트
```bash
cd frontend
npm test
```

## 🤝 기여하기

1. Fork 저장소
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📄 라이선스

MIT License

## 👥 연락처

프로젝트 관련 문의: [이메일 또는 GitHub 이슈]

---

**실행 확인**
- 백엔드: http://localhost:8000
- 프론트엔드: http://localhost:3000
- API 문서: http://localhost:8000/docs