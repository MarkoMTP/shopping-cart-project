import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../components/App';
import HomePage from '../components/Homepage'; // Ensure correct import path

describe('App component navigation', () => {
  it('renders the navbar correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('navigates to the homepage and displays content', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="homepage" element={<HomePage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Verify initial content
    expect(screen.queryByText('Welcome')).toBeNull(); // Ensure 'Welcome' is not on the initial page

    // Click the 'HomePage' link
    fireEvent.click(screen.getByText('HomePage'));

    // Verify that the content from HomePage is displayed
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('This is the HOME PAGE(fake)')).toBeInTheDocument();
    expect(screen.getByText('Its just for practice')).toBeInTheDocument();
  });
});
