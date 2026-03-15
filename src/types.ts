export type Severity = 'High' | 'Medium' | 'Low';

export interface AnalysisFinding {
  line: number;
  content: string;
  category: string;
  language: 'CSS' | 'JS';
  severity: Severity;
  purpose: string;
  modernReplacement: string;
}

export interface Rule {
  id: string;
  category: string;
  language: 'CSS' | 'JS';
  regex: RegExp;
  severity: Severity;
  purpose: string;
  modernReplacement: string;
}