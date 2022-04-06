import { render, screen } from '@testing-library/react';
import Navbar from './components/js/Navbar';

test('renders learn react link', () => {
  render(<Navbar />);
  const linkElement = screen.getByText('People');
  expect(linkElement).toBeInTheDocument();
});
