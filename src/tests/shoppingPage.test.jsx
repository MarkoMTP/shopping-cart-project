import { MemoryRouter, Route, Routes, useLoaderData } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../components/App';
import { fireEvent, render, screen } from '@testing-library/react';
import ShoppingPage from '../components/ShoppingPage';
import { vi } from 'vitest';
beforeEach(() => {
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useLoaderData: () => ({
        items: [
          { id: 1, title: 'Item 1', image: 'http://example.com/image1.jpg' },
          { id: 2, title: 'Item 2', image: 'http://example.com/image2.jpg' },
          { id: 3, title: 'Item 3', image: 'http://example.com/image3.jpg' },
        ],
      }),
    };
  });
});
describe('Shopping page with all items', () => {
  it('test the navigation to the shopping page correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/shoppingpage" element={<ShoppingPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Item 1')).toBeNull();

    fireEvent.click(screen.getByText('Shop'));

    expect(screen.getByText('Item 1')).toBeInTheDocument();
  }),
    it('test all the items are on the shopping page', () => {
      render(
        <MemoryRouter>
          <ShoppingPage></ShoppingPage>
        </MemoryRouter>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
});
