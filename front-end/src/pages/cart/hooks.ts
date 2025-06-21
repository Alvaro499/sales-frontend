// useCart.ts
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { CartItem } from "../../models/Products.models";

const useCart = () => {
  // 1. Obtener los productos del localStorage
  const getCartItemsFromLocalStorage = (): CartItem[] => {
    const storedItems = localStorage.getItem("cart");
    return storedItems ? JSON.parse(storedItems) : [];
  };

  // 2. Estado de los productos del carrito
  const [cartItems, setCartItems] = useState<CartItem[]>(getCartItemsFromLocalStorage);

  useEffect(() => {
    // Actualizamos el estado cuando el componente se monta o se actualiza
    setCartItems(getCartItemsFromLocalStorage());
  }, []);

  // 3. Función para calcular el total
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // 4. Función para actualizar las cantidades en el carrito
  const updateQuantity = (id: string, newQuantity: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Actualizamos el localStorage
  };

  // 5. Función para eliminar productos del carrito
  const removeItemFromCart = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Actualizamos el localStorage
  };

  // 6. Función para redirigir al checkout

  const navigate = useNavigate();  
  const goToCheckout = () =>  {
    navigate('/checkout');
  }

  return {
    cartItems,
    calculateTotal,
    updateQuantity,
    removeItemFromCart,
    goToCheckout
  };
};

export default useCart;