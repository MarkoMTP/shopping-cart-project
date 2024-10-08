import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  MemoryRouter,
  Routes,
  Route,
  useOutletContext,
} from 'react-router-dom';
import App from '../components/App';
import HomePage from '../components/Homepage'; // Ensure correct import path
import ShoppingPage from '../components/ShoppingPage';
import userEvent from '@testing-library/user-event';
import CartPage from '../components/shoppingCart';
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: vi.fn(),
    MemoryRouter: actual.MemoryRouter, // Include MemoryRouter
  };
});
describe('App component navigation', () => {
  const user = userEvent.setup();
  const mockFn = vi.fn();
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
  beforeEach(() => {
    // Reset the mock before each test
    vi.clearAllMocks();
  });

  it('renders the navbar correctly', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Buy Something')).toBeInTheDocument();
  });

  it('navigates to the shopping page and displays content', async () => {
    // Mock useOutletContext for this test
    useOutletContext.mockReturnValue({
      actualHandleAddToCart: mockFn,
      actualItems: mockItems,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="shoppingpage" element={<ShoppingPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Welcome')).toBeNull();

    await user.click(screen.getByText('Shop'));

    expect(await screen.findByText('Item 1')).toBeInTheDocument();
    expect(await screen.findByText('Item 2')).toBeInTheDocument();
  });
  it('navigates to homepage and displays content', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="shoppingpage" element={<ShoppingPage />} />
            <Route path="homepage" element={<HomePage />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Verify initial content
    expect(screen.queryByText('Welcome')).toBeNull(); // Ensure 'Welcome' is not on the initial page

    await user.click(screen.getByText('Home Page'));

    expect(await screen.findByText('Welcome')).toBeInTheDocument();
  });

  it('navigates to Cart Page and displays content', async () => {
    const mockCartItems = [
      {
        id: '1',
        title: 'Item 1',
        image: 'https://via.placeholder.com/150',
        price: 10,
      },
    ];

    // Mock the useOutletContext to provide cart items
    useOutletContext.mockReturnValue({
      actualHandleAddToCart: mockFn,
      actualItems: mockItems,
      cartItems: mockCartItems, // Mocked cart items
    });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="shoppingpage" element={<ShoppingPage />} />
            <Route path="cart" element={<CartPage />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Verify initial content
    expect(screen.queryByText('Welcome')).toBeNull(); // Ensure 'Welcome' is not on the initial page

    await user.click(screen.getByText('In Cart'));

    expect(await screen.findByText('Your Items:')).toBeInTheDocument();
  });
});
