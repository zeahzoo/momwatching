#!/usr/bin/env python3
"""
베리타스알파 의대 진학 순위 크롤링 스크립트
2021-2023년 데이터 수집
"""

import json
import time
from pathlib import Path

# 베리타스알파 의대 순위 기사 URL (수동으로 찾아서 입력)
MEDICAL_ARTICLES = {
    "2023": {
        "url": "http://www.veritas-a.com/news/articleView.html?idxno=467289",
        "title": "2023 의대 합격자 톱20"
    },
    "2022": {
        "url": "http://www.veritas-a.com/news/articleView.html?idxno=421178",
        "title": "2022 의대 합격자 톱20"
    },
    "2021": {
        "url": "http://www.veritas-a.com/news/articleView.html?idxno=377264",
        "title": "2021 의대 합격자 톱20"
    }
}

def fetch_medical_data(year: str, url: str):
    """
    베리타스알파 기사에서 의대 진학 데이터 추출
    실제 구현은 HTML 파싱 필요
    """
    print(f"Fetching {year} medical school data from {url}")
    
    # TODO: 실제 크롤링 구현
    # 1. requests로 HTML 가져오기
    # 2. BeautifulSoup로 파싱
    # 3. 표에서 학교명, 합격자 수 추출
    # 4. JSON 형식으로 반환
    
    return {
        "year": year,
        "source": url,
        "schools": []
    }

def update_database(year: str, schools_data: list):
    """
    public/data.json 업데이트
    """
    data_file = Path(__file__).parent.parent / "public" / "data.json"
    
    with open(data_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 의대 데이터 추가
    for school_info in schools_data:
        school_name = school_info['name']
        total = school_info['total']
        
        if school_name not in data['schools']:
            data['schools'][school_name] = {
                "admissions": {"의대": {}},
                "metadata": {}
            }
        
        if '의대' not in data['schools'][school_name]['admissions']:
            data['schools'][school_name]['admissions']['의대'] = {}
        
        data['schools'][school_name]['admissions']['의대'][year] = {
            "rank": school_info.get('rank'),
            "total": total
        }
    
    # 저장
    with open(data_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Updated {len(schools_data)} schools for {year}")

def main():
    print("베리타스알파 의대 진학 데이터 크롤링 시작...")
    
    for year, info in MEDICAL_ARTICLES.items():
        print(f"\n=== {year}년 데이터 수집 ===")
        data = fetch_medical_data(year, info['url'])
        
        if data['schools']:
            update_database(year, data['schools'])
        else:
            print(f"⚠️ {year}년 데이터를 찾을 수 없습니다. URL을 확인하세요: {info['url']}")
        
        time.sleep(2)  # Rate limiting
    
    print("\n✅ 크롤링 완료!")

if __name__ == "__main__":
    main()
