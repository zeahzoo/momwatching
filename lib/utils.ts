import { Database, RankedSchool } from './types';

export function getRankedSchools(data: Database, year: string = '2025'): RankedSchool[] {
  const schools: RankedSchool[] = [];

  Object.entries(data.schools).forEach(([name, schoolData]) => {
    const seoulUnivData = schoolData.admissions?.서울대?.[year] || schoolData.admissions?.seoul_univ?.[year];

    if (seoulUnivData && seoulUnivData.total) {
      // Get historical data
      const yearDataArray = [];
      for (const y of ['2021', '2022', '2023', '2024', '2025']) {
        const ySeoul = schoolData.admissions?.서울대?.[y] || schoolData.admissions?.seoul_univ?.[y];
        if (ySeoul && ySeoul.total) {
          yearDataArray.push({
            year: y,
            total: ySeoul.total || 0,
            susi: ySeoul.susi || 0,
            jeongsi: ySeoul.jeongsi || 0,
          });
        }
      }

      schools.push({
        name,
        total: seoulUnivData.total,
        susi: seoulUnivData.susi || 0,
        jeongsi: seoulUnivData.jeongsi || 0,
        region: schoolData.metadata?.region,
        type: schoolData.metadata?.type,
        yearData: yearDataArray,
      });
    }
  });

  return schools.sort((a, b) => b.total - a.total);
}

export function getSchoolById(data: Database, id: string): RankedSchool | null {
  const schoolData = data.schools[id];
  if (!schoolData) return null;

  const yearDataArray = [];
  let latestTotal = 0;
  let latestSusi = 0;
  let latestJeongsi = 0;

  for (const y of ['2021', '2022', '2023', '2024', '2025']) {
    const ySeoul = schoolData.admissions?.서울대?.[y] || schoolData.admissions?.seoul_univ?.[y];
    if (ySeoul && ySeoul.total) {
      yearDataArray.push({
        year: y,
        total: ySeoul.total || 0,
        susi: ySeoul.susi || 0,
        jeongsi: ySeoul.jeongsi || 0,
      });
      latestTotal = ySeoul.total || 0;
      latestSusi = ySeoul.susi || 0;
      latestJeongsi = ySeoul.jeongsi || 0;
    }
  }

  return {
    name: id,
    total: latestTotal,
    susi: latestSusi,
    jeongsi: latestJeongsi,
    region: schoolData.metadata?.region,
    type: schoolData.metadata?.type,
    yearData: yearDataArray,
  };
}

export function getAvailableYears(data: Database): string[] {
  return data.metadata.years_covered.sort().reverse();
}
