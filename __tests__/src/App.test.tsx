import React from 'react';
import { render } from '@testing-library/react';
import App from '@/src/App';

test('cont not crash', () => {
  expect(() => render(<App />)).not.toThrow();
});
