import type { AnalysisFinding, Rule } from './types';
import rulesData from './rules.json';

// Map the JSON data to include actual RegExp objects
const RULES: Rule[] = rulesData.map(rawRule => ({
  ...rawRule,
  // Use 'gi' flags for global, case-insensitive matching
  regex: new RegExp(rawRule.regex, 'gi')
})) as Rule[];

export const analyzeByLine = (input: string): AnalysisFinding[] => {
  const lines = input.split('\n');
  const findings: AnalysisFinding[] = [];

  lines.forEach((lineText, index) => {
    // Keep track of which rules have already fired for this line
    // to avoid generic prefix rules overlapping specific proprietary ones
    const firedRuleIds = new Set<string>();

    RULES.forEach(rule => {
      rule.regex.lastIndex = 0;
      if (rule.regex.test(lineText) && !firedRuleIds.has(rule.id)) {
        findings.push({
          line: index + 1,
          content: lineText.trim(),
          category: rule.category,
          severity: rule.severity,
          purpose: rule.purpose,
          modernReplacement: rule.modernReplacement
        });
        firedRuleIds.add(rule.id);
      }
    });
  });

  return findings;
};