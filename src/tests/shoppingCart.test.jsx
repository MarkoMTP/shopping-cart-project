import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import ShoppingPage from '../components/ShoppingPage';
import CartPage from '../components/shoppingCart';
import App from '../components/App';
import userEvent from '@testing-library/user-event';

describe('Shopping cart', () => {
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

  it('makes sure the add and the delete button on items in shopping cart works as well as the navigation from shop to cart', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<App givenItems={mockItems} />}>
            <Route path="shoppingpage" element={<ShoppingPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    //go to shop choose a product and then go to cart
    await user.click(screen.getByText('Shop'));
    expect(await screen.findByText('Item 1')).toBeInTheDocument();

    const buttons = await screen.findAllByText('Add to Cart');
    await user.click(buttons[0]);
    await user.click(buttons[0]);
    await user.click(buttons[0]);

    await user.click(screen.getByText('In Cart'));

    const deleteButton = await screen.findByText('-');
    const addButton = await screen.findByText('+');

    expect(await screen.findByText('3 of items')).toBeInTheDocument();

    //check for plus button
    await user.click(addButton);
    await user.click(addButton);

    expect(await screen.findByText('5 of items')).toBeInTheDocument();
    await user.click(deleteButton);
    await user.click(deleteButton);
    await user.click(deleteButton);

    expect(await screen.findByText('2 of items')).toBeInTheDocument();
  });
});
