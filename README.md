# 패션 커머스 개인화 추천 A/B 테스트

H&M 패션 데이터셋 기반으로 개인화 추천 모델이 추천 품질에 미치는 영향을 실험한 프로젝트입니다.
단순 CVR 비교를 넘어 Hit Rate, Catalog Coverage, Diversity 등 다각도 지표로 검증했습니다.

## 실험 결과

| 모델 | Hit Rate | Catalog Coverage |
|------|----------|-----------------|
| 인기 추천 (Control) | 36.25% | 0.04% |
| ALS 개인화 (Test) | 27.81% | 3.09% |
| **Hybrid α=0.1 (최종 채택)** | **35.90%** | **4.37%** |

- Hybrid가 인기 추천 대비 Hit Rate 동등 수준 유지 + Coverage **109배** 확장
- ALS 단독 대비 Hit Rate **+8.09%p** 회복

## 핵심 인사이트

인기 추천과 개인화 추천은 정확도(Hit Rate)와 다양성(Coverage) 사이의 Trade-off 관계에 있습니다.
ALS 점수(10%)와 인기 점수(90%)를 정규화하여 가중합하는 Hybrid 방식으로 이 Trade-off를 해소했습니다.

## 데모

로컬 실행 후 확인 가능합니다. 재현 방법 섹션 참고.
- 백엔드 API 문서: `http://localhost:8000/docs`
- 프론트엔드: `http://localhost:5173`

## 기술 스택

| 영역 | 사용 기술 |
|------|---------|
| 데이터 분석 | Python, Pandas, NumPy, Parquet |
| 추천 모델 | implicit (ALS), Weighted Hybrid |
| 통계 검정 | SciPy, statsmodels |
| 시각화 | Matplotlib, Seaborn, Recharts |
| 백엔드 | FastAPI, Uvicorn |
| 프론트엔드 | React, Vite, TailwindCSS, React Query |
| 배포 | Vercel (프론트) / Render (백엔드) |

## 프로젝트 구조
```
h-m-analytics/
├── notebooks/          # 분석 노트북 (01~06)
├── data/               # 데이터 (git 제외)
├── backend/            # FastAPI
├── frontend/           # React + Vite
└── README.md
```

## 분석 흐름

1. **데이터 수집 및 전처리** `01_data_setup.ipynb`
   - H&M 트랜잭션 데이터 샘플링 (5만 유저, 최근 6개월)
   - Parquet 변환으로 용량 최적화

2. **탐색적 분석** `02_EDA.ipynb`
   - 구매 퍼널 분석 → CVR 낮음 직접 증명
   - 인기 상품 집중도 (상위 1% 상품이 전체 구매의 상당 부분 차지)
   - 유저별 구매 카테고리 다양성 분석

3. **피처 엔지니어링** `03_features.ipynb`
   - RFM 기반 유저 세그먼트
   - 시간 기반 Train/Test Split (마지막 30일 = test)

4. **ALS 협업 필터링** `04_ALS_model.ipynb`
   - implicit 라이브러리 기반 ALS 학습
   - Hit Rate@12, NDCG@12 오프라인 평가

5. **A/B 테스트 검증** `05_AB_test.ipynb`
   - Hit Rate, Catalog Coverage, ILD, Personalization Score 다각도 평가
   - Weighted Hybrid (α=0.1) 최적 균형점 도출
   - α Trade-off 시각화

6. **모델 비교 및 최종 선택** `06_model_comparison.ipynb`
   - 인기 추천 vs ALS vs Hybrid 3파전 비교
   - LightFM 시도 및 환경 제약으로 미채택 (운영 안정성 이슈)
   - Hybrid α=0.1 최종 배포 모델 확정

## 재현 방법
```bash
# 1. 노트북 환경
pip install -r requirements.txt

# Kaggle에서 데이터 다운로드
kaggle competitions download -c h-and-m-personalized-fashion-recommendations \
  -f transactions_train.csv -f articles.csv -f customers.csv

# notebooks/ 순서대로 실행 (01 → 06)

# 2. 백엔드 로컬 실행
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

# 3. 프론트엔드 로컬 실행
cd frontend
npm install
echo "VITE_API_URL=http://localhost:8000" > .env
npm run dev
```

## 한계점과 개선 방향

- 오프라인 시뮬레이션의 Popularity Bias — 인기 상품이 구조적으로 유리한 환경
- Cold Start 유저는 인기 추천 Fallback으로 대응 중 → 콘텐츠 기반 보완
- 실제 서비스 A/B 테스트에서 CTR, 구매 전환율 추가 검증 필요함

