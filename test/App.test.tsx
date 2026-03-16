import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  it('renders the analyzer', () => {
    render(<App />);

    expect(screen.getByText('Legacy CSS Inspector')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Analyze Code' })).toBeInTheDocument();
  });
});