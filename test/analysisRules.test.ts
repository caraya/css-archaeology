import { describe, expect, it } from 'vitest';
import { analyzeByLine } from '../src/analysisRules';

describe('analyzeByLine', () => {
  it('returns empty findings for unrelated input', () => {
    const input = '.card { display: flex; color: rebeccapurple; }';
    const results = analyzeByLine(input);

    expect(results).toEqual([]);
  });

  it('detects CSS legacy patterns with CSS language tag', () => {
    const input = '_width: 240px;\n.button { color: #cc0000\\9; }';
    const results = analyzeByLine(input);

    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.language === 'CSS')).toBe(true);
    expect(results.some((r) => r.line === 1)).toBe(true);
  });

  it('detects JavaScript legacy patterns with JS language tag', () => {
    const input = 'if (document.all) { console.log(document.layers); }';
    const results = analyzeByLine(input);

    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.language === 'JS')).toBe(true);
    expect(results.some((r) => r.category.includes('Browser'))).toBe(true);
  });

  it('detects mixed CSS and JS content in one input', () => {
    const input = [
      '_width: 240px;',
      'if (el.currentStyle) { console.log(el.currentStyle.width); }',
    ].join('\n');

    const results = analyzeByLine(input);

    expect(results.some((r) => r.language === 'CSS')).toBe(true);
    expect(results.some((r) => r.language === 'JS')).toBe(true);
  });

  it('resets regex state and finds the same pattern across multiple lines', () => {
    const input = [
      'if (document.all) {',
      '  console.log(1);',
      '}',
      'if (document.all) {',
      '  console.log(2);',
      '}',
    ].join('\n');

    const results = analyzeByLine(input);
    const allMatches = results.filter((r) => r.content.includes('document.all'));

    expect(allMatches.length).toBe(2);
    expect(allMatches.map((r) => r.line)).toEqual([1, 4]);
  });
});