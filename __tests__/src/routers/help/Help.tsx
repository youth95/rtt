import React from 'react';
import { render } from '@testing-library/react';
import Help from '@/src/routers/help/Help';

test('cont not crash', () => {
  expect(() => render(<Help />)).not.toThrow();
});
