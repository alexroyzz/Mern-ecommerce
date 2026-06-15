import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      if (!userId) {
        setCart(null);
        return;
      }

      const res = await api.get(`/cart/${userId}`);
      setCart(res.data);
    } catch (error) {
      console.error(error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      await api.delete("/cart/remove", {
        data: { userId, productId },
      });

      await loadCart();
      window.dispatchEvent(new Event("cartUpdate"));
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      await api.put("/cart/update", {
        userId,
        productId,
        quantity,
      });

      await loadCart();
      window.dispatchEvent(new Event("cartUpdate"));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading Cart...</div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="text-center mt-10 text-2xl font-semibold">
        🛒 Your cart is empty
      </div>
    );
  }

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.productId._id}
              className="bg-white shadow rounded-xl p-4 flex gap-4"
            >
              <img
                src={item.productId.image}
                alt={item.productId.title}
                className="w-32 h-32 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {item.productId.title}
                </h2>

                <p className="text-gray-600 mt-2">₹{item.productId.price}</p>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, item.quantity - 1)
                    }
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, item.quantity + 1)
                    }
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <button
                  onClick={() => removeFromCart(item.productId._id)}
                  className="text-red-500 font-semibold"
                >
                  Remove
                </button>

                <p className="font-bold text-lg">
                  ₹{item.productId.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow rounded-xl p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-3">
            <span>Total Items</span>
            <span>
              {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <div className="flex justify-between text-xl font-bold border-t pt-4">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div> 

          <button
            onClick={() => navigate("/checkout/address")}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
