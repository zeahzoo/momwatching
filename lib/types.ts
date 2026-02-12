export interface SchoolAdmission {
  total: number;
  susi?: number;
  jeongsi?: number;
  rank?: number;
  source?: string;
  source_url?: string;
}

export interface SchoolMetadata {
  type?: string;
  region?: string;
}

export interface School {
  name: string;
  admissions: {
    [year: string]: {
      seoul_univ?: SchoolAdmission;
      서울대?: SchoolAdmission;
      의대?: SchoolAdmission;
    };
  };
  metadata?: SchoolMetadata;
}

export interface DatabaseMetadata {
  collection_date: string;
  data_source: string;
  years_covered: string[];
  universities_covered: string[];
  total_schools: number;
  description: string;
  last_updated: string;
}

export interface Database {
  metadata: DatabaseMetadata;
  schools: {
    [schoolName: string]: {
      admissions: any;
      metadata?: SchoolMetadata;
    };
  };
}

export interface RankedSchool {
  name: string;
  total: number;
  susi: number;
  jeongsi: number;
  region?: string;
  type?: string;
  rank?: number;
  yearData: {
    year: string;
    total: number;
    susi: number;
    jeongsi: number;
  }[];
}
