import { Database, RankedSchool } from './types';

export function getRankedSchools(data: Database, year: string = '2025'): RankedSchool[] {
  const schools: RankedSchool[] = [];

  Object.entries(data.schools).forEach(([name, schoolData]) => {
    // Correct data structure: admissions[year].seoul_univ
    const seoulUnivData = schoolData.admissions?.[year]?.seoul_univ;

    if (seoulUnivData && seoulUnivData.total) {
      // Get historical data
      const yearDataArray = [];
      for (const y of ['2021', '2022', '2023', '2024', '2025', '2026']) {
        const ySeoul = schoolData.admissions?.[y]?.seoul_univ;
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

  for (const y of ['2021', '2022', '2023', '2024', '2025', '2026']) {
    const ySeoul = schoolData.admissions?.[y]?.seoul_univ;
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

export function getSchoolsByYear(data: Database, year: string): RankedSchool[] {
  const schools: RankedSchool[] = [];

  Object.entries(data.schools).forEach(([name, schoolData]) => {
    const seoulUnivData = schoolData.admissions?.[year]?.seoul_univ || schoolData.admissions?.서울대?.[year];

    if (seoulUnivData && seoulUnivData.total) {
      schools.push({
        name,
        total: seoulUnivData.total,
        susi: seoulUnivData.susi || 0,
        jeongsi: seoulUnivData.jeongsi || 0,
        region: schoolData.metadata?.region,
        type: schoolData.metadata?.type,
        yearData: [],
      });
    }
  });

  return schools.sort((a, b) => b.total - a.total);
}

export function getMedicalSchools(data: Database, year: string = '2024'): RankedSchool[] {
  const schools: RankedSchool[] = [];

  Object.entries(data.schools).forEach(([name, schoolData]) => {
    const medicalData = schoolData.admissions?.의대?.[year];

    if (medicalData && medicalData.total) {
      schools.push({
        name,
        total: medicalData.total,
        susi: 0,
        jeongsi: 0,
        region: schoolData.metadata?.region,
        type: schoolData.metadata?.type,
        yearData: [],
      });
    }
  });

  return schools.sort((a, b) => b.total - a.total);
}

export function getSnuMedicalSchools(data: Database, year: string = '2026'): RankedSchool[] {
  const schools: RankedSchool[] = [];

  Object.entries(data.schools).forEach(([name, schoolData]) => {
    const medicalData = schoolData.admissions?.서울대_의대?.[year];

    if (medicalData && medicalData.total) {
      // Get historical data
      const yearDataArray = [];
      for (const y of ['2025', '2026']) {
        const yMed = schoolData.admissions?.서울대_의대?.[y];
        if (yMed && yMed.total) {
          yearDataArray.push({
            year: y,
            total: yMed.total || 0,
            susi: yMed.susi || 0,
            jeongsi: yMed.jeongsi || 0,
          });
        }
      }

      schools.push({
        name,
        total: medicalData.total,
        susi: medicalData.susi || 0,
        jeongsi: medicalData.jeongsi || 0,
        region: schoolData.metadata?.region,
        type: schoolData.metadata?.type,
        rank: medicalData.rank,
        yearData: yearDataArray,
      });
    }
  });

  return schools.sort((a, b) => {
    if (a.rank && b.rank) return a.rank - b.rank;
    return b.total - a.total;
  });
}
