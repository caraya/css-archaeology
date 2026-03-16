import React, { useState } from 'react';
import { analyzeByLine } from './analysisRules';
import type { AnalysisFinding } from './types';

export const CSSAnalyzer: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [findings, setFindings] = useState<AnalysisFinding[]>([]);

  const handleAnalysis = () => {
    setFindings(analyzeByLine(input));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
      <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Legacy CSS Inspector</h1>
        <button
          onClick={handleAnalysis}
          style={{
            padding: '10px 24px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Analyze Code
        </button>
      </header>

      {/* Main Container with 30% / 70% Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '30% 1fr', gap: '20px', height: 'calc(100vh - 120px)' }}>

        {/* Left Column: Source (30%) */}
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>Source Code (CSS / JavaScript)</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your legacy CSS or JavaScript here..."
            style={{
              flex: 1,
              padding: '12px',
              fontFamily: '"Fira Code", "Courier New", monospace',
              fontSize: '13px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              resize: 'none',
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              lineHeight: '1.5'
            }}
          />
        </div>

        {/* Right Column: Results (Remainder) */}
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>
            Analysis Results {findings.length > 0 && `(${findings.length})`}
          </h3>
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '6px',
            overflowY: 'auto',
            backgroundColor: '#fff',
            flex: 1
          }}>
            {findings.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
                Enter code and click "Analyze" to identify legacy patterns.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa', zIndex: 1 }}>
                  <tr style={{ textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>
                    <th style={{ padding: '12px', width: '60px' }}>Line</th>
                    <th style={{ padding: '12px', width: '60px' }}>Type</th>
                    <th style={{ padding: '12px', width: '150px' }}>Category</th>
                    <th style={{ padding: '12px', width: '100px' }}>Severity</th>
                    <th style={{ padding: '12px' }}>Insight & Context</th>
                  </tr>
                </thead>
                <tbody>
                  {findings.map((f, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: '1px solid #eee',
                        backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa'
                      }}
                    >
                      <td style={{ padding: '12px', fontWeight: 'bold', color: '#666' }}>{f.line}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 'bold',
                          padding: '2px 6px',
                          borderRadius: '3px',
                          ...(f.language === 'JS'
                            ? { background: '#fff3cd', color: '#7d5700' }
                            : { background: '#dce8ff', color: '#0550ae' })
                        }}>
                          {f.language}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          background: '#e9ecef',
                          padding: '2px 6px',
                          borderRadius: '3px'
                        }}>
                          {f.category}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <b style={{
                          color: f.severity === 'High' ? '#dc3545' : f.severity === 'Medium' ? '#fd7e14' : '#0d6efd'
                        }}>
                          {f.severity}
                        </b>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>{f.purpose}</div>
                        <div style={{ color: '#28a745', fontSize: '13px', marginBottom: '8px' }}>
                          <b>Modern Fix:</b> {f.modernReplacement}
                        </div>
                        <div style={{
                          padding: '8px',
                          background: '#f1f1f1',
                          borderRadius: '4px',
                          fontFamily: 'monospace',
                          fontSize: '12px',
                          overflowX: 'auto',
                          whiteSpace: 'pre-wrap',
                          borderLeft: '3px solid #ccc'
                        }}>
                          {f.content}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};