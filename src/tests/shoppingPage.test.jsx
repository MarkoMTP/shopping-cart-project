import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ShoppingPage from '../components/ShoppingPage'; // Adjust the import path based on your file structure

describe('ShoppingPage', () => {
  const mockHandleAddToCart = vi.fn();

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

  it('renders loading state', () => {
    renderWithRouter(
      <ShoppingPage handleAddToCart={mockHandleAddToCart} items={[]} />
    );
    expect(screen.getByText(/Fetching items.../)).toBeInTheDocument();
  });

  it('renders items after loading', async () => {
    renderWithRouter(
      <ShoppingPage handleAddToCart={mockHandleAddToCart} items={mockItems} />
    );

    // Wait for the loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/Fetching items.../)).not.toBeInTheDocument();
    });

    // Check if items are rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByAltText('Item 1')).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150'
    );

    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('$20')).toBeInTheDocument();
    expect(screen.getByAltText('Item 2')).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150'
    );
  });

  it('calls handleAddToCart when button is clicked', async () => {
    renderWithRouter(
      <ShoppingPage handleAddToCart={mockHandleAddToCart} items={mockItems} />
    );

    await waitFor(() => {
      expect(screen.queryByText(/Fetching items.../)).not.toBeInTheDocument();
    });

    const buttons = screen.getAllByText('Add to Cart');
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[0]);
    expect(mockHandleAddToCart).toHaveBeenCalledTimes(2);
  });
});
