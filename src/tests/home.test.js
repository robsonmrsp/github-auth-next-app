import { render, screen } from '@testing-library/react';
import Index from '../pages/index';
import TestApp from './TestApp';


describe('App', () => {
  it('Render the start page', () => {
    render(
      <TestApp>
        <Index />
      </TestApp>
    );

    const title = screen.getByText('Git hub app');
    const searchInput = screen.getByPlaceholderText('Find a github user');

    expect(title).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });
});
