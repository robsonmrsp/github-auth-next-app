import { render, screen } from '@testing-library/react';
import Index from '../pages/index';

describe('App', () => {
  it('Render the start page', () => {
    render(<Index />);

    const title = screen.getByText('GitHub App');
    const searchInput = screen.getByPlaceholderText('Find a repository');

    expect(title).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });
});
