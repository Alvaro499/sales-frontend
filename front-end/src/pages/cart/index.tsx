import React from "react";
import useCart from "./hooks";


const CartPage: React.FC = () => {
  const {
    cartItems,
    calculateTotal,
    updateQuantity,
    removeItemFromCart,
    goToCheckout
  } = useCart();

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Carrito de Compras</h1>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.images[0]} alt={item.name} width={50} />
              </td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  max={item.stock}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="form-control"
                />
              </td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => removeItemFromCart(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between mt-4">
        <h2>Total: ${calculateTotal()}</h2>
        <button className="btn btn-success" onClick={goToCheckout}>
          Continuar con el Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
