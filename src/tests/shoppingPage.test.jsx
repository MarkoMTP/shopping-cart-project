import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ShoppingPage from '../components/ShoppingPage';
import userEvent from '@testing-library/user-event';
import App from '../components/App';

describe('ShoppingPage', () => {
  const mockHandleAddToCart = vi.fn();
  const user = userEvent.setup();

  const mockItems = [
    {
      id: '1',
      title: 'Item 1',
      image: 'https://via.placeholder.com/150',
      price: 10,
    },
    {
      id: '2',
      title: 'Item 2',
      image: 'https://via.placeholder.com/150',
      price: 20,
    },
  ];

  const renderWithRouter = (ui, { route = '/' } = {}) => {
    return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
  };

  it('calls handleAddToCart when button is clicked', async () => {
    renderWithRouter(
      <Routes>
        <Route
          path="/"
          element={
            <App handleAddToCart={mockHandleAddToCart} givenItems={mockItems} />
          }
        >
          <Route path="shoppingpage" element={<ShoppingPage />} />
        </Route>
      </Routes>
    );

    // Ensure the "Shop" link is in the DOM and click it
    await user.click(screen.getByText('Shop'));

    // Wait for the loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText(/Loading items.../)).not.toBeInTheDocument();
    });

    // Check if the "Add to Cart" buttons are rendered
    const buttons = await screen.findAllByText('Add to Cart');
    expect(buttons.length).toBeGreaterThan(0); // Ensure there are buttons rendered

    // Simulate clicking the first button twice
    await user.click(buttons[0]);
    await user.click(buttons[0]);

    // Check if the handler was called twice
    expect(mockHandleAddToCart).toHaveBeenCalledTimes(2);
  });
});
