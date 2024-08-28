import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ShoppingPage from '../components/ShoppingPage'; // Adjust the import path based on your file structure
import userEvent from '@testing-library/user-event';

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

  it('renders items after loading', async () => {
    renderWithRouter(
      <ShoppingPage handleAddToCart={mockHandleAddToCart} items={mockItems} />
    );

    await waitFor(() => {
      expect(screen.queryByText(/Loading items.../)).not.toBeInTheDocument();
    });

    expect(await screen.findByText('Item 1')).toBeInTheDocument();
    expect(await screen.findByAltText('Item 1')).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150'
    );

    expect(await screen.findByText('Item 2')).toBeInTheDocument();
    expect(await screen.findByAltText('Item 2')).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150'
    );
  });

  it('calls handleAddToCart when button is clicked', async () => {
    renderWithRouter(
      <ShoppingPage handleAddToCart={mockHandleAddToCart} items={mockItems} />
    );

    await waitFor(() => {
      expect(screen.queryByText(/Loading items.../)).not.toBeInTheDocument();
    });

    const buttons = await screen.findAllByText('Add to Cart');
    await user.click(buttons[0]);
    await user.click(buttons[0]);
    expect(mockHandleAddToCart).toHaveBeenCalledTimes(2);
  });
});
