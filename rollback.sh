#!/bin/bash
# 제 수정 전으로 롤백
git revert 2612913 --no-edit
git push origin main
echo "✅ 롤백 완료 - Vercel 자동 재배포 중"
