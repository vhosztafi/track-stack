import { render, screen } from '@testing-library/react';

import App from './App';

test('renders TrackStack heading', () => {
  render(<App />);
  expect(screen.getByText(/TrackStack App/i)).toBeInTheDocument();
});
