import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CSSAnalyzer } from '../src/Analyzer';

describe('CSSAnalyzer', () => {
  it('renders initial UI state', () => {
    render(<CSSAnalyzer />);

    expect(screen.getByText('Legacy CSS Inspector')).toBeInTheDocument();
    expect(screen.getByText(/Enter code and click "Analyze"/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Analyze Code' })).toBeInTheDocument();
  });

  it('analyzes pasted CSS and JS and shows findings in results table', async () => {
    const user = userEvent.setup();
    render(<CSSAnalyzer />);

    const textarea = screen.getByPlaceholderText('Paste your legacy CSS or JavaScript here...');
    fireEvent.change(textarea, {
      target: {
        value: '_width: 120px;\nif (document.all) { console.log("legacy"); }',
      },
    });

    await user.click(screen.getByRole('button', { name: 'Analyze Code' }));

    expect(screen.getByText(/Analysis Results \(/i)).toBeInTheDocument();
    expect(screen.getByText('CSS')).toBeInTheDocument();
    expect(screen.getByText('JS')).toBeInTheDocument();
    expect(screen.getAllByText(/Modern Fix:/i).length).toBeGreaterThan(0);
  });

  it('keeps empty state after analyze when no rules match', async () => {
    const user = userEvent.setup();
    render(<CSSAnalyzer />);

    const textarea = screen.getByPlaceholderText('Paste your legacy CSS or JavaScript here...');
    fireEvent.change(textarea, {
      target: {
        value: '.clean { display: grid; gap: 12px; }',
      },
    });
    await user.click(screen.getByRole('button', { name: 'Analyze Code' }));

    expect(screen.getByText(/No legacy patterns detected yet|Enter code and click "Analyze"/i)).toBeInTheDocument();
  });
});