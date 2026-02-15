#!/bin/bash

# Unsplash 이미지로 대체 (hotlinking 허용)
declare -A images=(
  ["gwacheon"]="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200"  # 책과 공부
  ["gyeonggi"]="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200"  # 대학 캠퍼스
  ["daewon"]="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=1200"   # 학생들
  ["gifted"]="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200"   # 과학 실험
  ["seoul2026"]="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200" # 노트북과 공부
  ["kpop"]="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200"     # 음악/공연
  ["medical"]="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200"  # 의료/병원
  ["megastudy"]="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200" # 사무실/교육
)

for name in "${!images[@]}"; do
  url="${images[$name]}"
  echo "Downloading $name..."
  curl -s -L "$url" -o "public/images/news/${name}.jpg"
  sleep 1
done

echo "Download complete!"
