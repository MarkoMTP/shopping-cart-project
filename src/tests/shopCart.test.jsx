// import { describe, it, expect, vi } from 'vitest';
// import { MemoryRouter, Route, Routes, beforeEach } from 'react-router-dom';
// import { fireEvent, render, screen } from '@testing-library/react';
// import App from '../components/App';
// import ShoppingPage from '../components/ShoppingPage';
// import CartPage from '../components/shoppingCart';
// beforeEach(() => {
//   vi.mock('react-router-dom', async () => {
//     const actual = await vi.importActual('react-router-dom');
//     return {
//       ...actual,
//       useLoaderData: () => ({
//         items: [
//           { id: 1, title: 'Item 1', image: 'http://example.com/image1.jpg' },
//           { id: 2, title: 'Item 2', image: 'http://example.com/image2.jpg' },
//           { id: 3, title: 'Item 3', image: 'http://example.com/image3.jpg' },
//         ],
//       }),
//     };
//   });
// });

// describe('Add to Cart and display items in Cart', () => {
//   it('should add an item to the cart and display it on the cart page', () => {
//     render(
//       <MemoryRouter initialEntries={['/']}>
//         <Routes>
//           <Route path="/" element={<App />}>
//             <Route path="/shoppingpage" element={<ShoppingPage />} />
//             <Route path="/cart" element={<CartPage />} />
//           </Route>
//         </Routes>
//       </MemoryRouter>
//     );

//     // Simulate navigation to the shopping page
//     fireEvent.click(screen.getByText('Shop'));

//     // Click the "Add to Cart" button for an item
//     const buttons = screen.getAllByText('Add to cart');

//     // Simulate navigation to the cart page
//     fireEvent.click(buttons[0]);

//     // Assert that the item is displayed on the cart page
//     expect(buttons[0]).toHaveBeenClicked();
//   });
// });
