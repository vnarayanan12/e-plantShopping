import React, {useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  // Calculate total quantity of all items in the cart
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = useMemo(() => {
    return cartItems.reduce((total, item) => {
      // Convert item.cost to a number by removing the $ symbol
      const cost = parseFloat(item.cost.replace('$', ''));
      return total + cost * item.quantity;
    }, 0);
  }, [cartItems]);

  const handleContinueShopping = (e) => {
   if (onContinueShopping) {
      onContinueShopping(); // Call the function passed from the parent component
    }
  };



  // Increment the quantity of an item
  const handleIncrement = (id, currentQuantity) => {
    dispatch(updateItemQuantity({ id, quantity: currentQuantity + 1 }));
  };

  // Event handler for decrementing item quantity
  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateItemQuantity({ id, quantity: currentQuantity - 1 }));
    } else {
      handleRemove(id); // Remove the item if quantity is 1
    }
  };

  // Event handler for removing an item from the cart
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  // Calculate total cost based on quantity for an item
   const calculateTotalCost = (cost, quantity) => {
    return parseFloat(cost.replace('$', '')) * quantity;
  };

return (
    <div className="cart-items">
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <h2>{item.name}</h2>
          <p>Cost: {item.cost}</p>
          <p>Quantity: {item.quantity}</p>

          {/* Calculate and display the subtotal for each item */}
          <p>Subtotal: ${calculateTotalCost(item.cost, item.quantity).toFixed(2)}</p>

          <div className="quantity-controls">
            <button onClick={() => handleDecrement(item.id, item.quantity)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleIncrement(item.id, item.quantity)}>+</button>
          </div>
          <button onClick={() => handleRemove(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};  

export default CartItem;
