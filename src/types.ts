export type Severity = 'High' | 'Medium' | 'Low';

export interface AnalysisFinding {
  line: number;
  content: string;
  category: string;
  severity: Severity;
  purpose: string;
  modernReplacement: string;
}

export interface Rule {
  id: string;
  category: string;
  regex: RegExp;
  severity: Severity;
  purpose: string;
  modernReplacement: string;
}