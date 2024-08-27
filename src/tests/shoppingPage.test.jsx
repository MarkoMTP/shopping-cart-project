import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ShoppingPage from '../components/ShoppingPage'; // Adjust the import path based on your file structure
import HomePage from '../components/Homepage';
import CartPage from '../components/shoppingCart';
import App from '../components/App';
import userEvent from '@testing-library/user-event';

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

describe('shopping page to shopping cart', () => {
  const mockHandleAddToCart = vi.fn();

  // Mock react-router-dom globally before running the tests
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');

    return {
      ...actual,
      // Mock `useLoaderData` to return items
      useLoaderData: () => [
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
      ],
    };
  });

  const user = userEvent.setup();

  it('renders the shopping page and cart correctly', async () => {
    // Set the initial route to the shopping page
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              path="shoppingpage"
              element={
                <ShoppingPage
                  element={
                    <ShoppingPage
                      handleAddToCart={mockHandleAddToCart}
                      items={[
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
                      ]}
                    />
                  }
                />
              }
            />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByText('Shop'));

    // Verify that items are rendered from useLoaderData
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();

    // Simulate user interaction to add to cart
    await user.click(screen.getAllByText('Add to Cart')[0]);

    expect(mockHandleAddToCart).toHaveBeenCalledTimes(1);

    // You can continue testing cart navigation and other logic here
    // e.g., navigate to the cart page and check contents
  });
});
