import React, { useState, useEffect } from "react";
import api from "../api/axios";

const Checkout = () => {
  const userId = localStorage.getItem("userId");

  const [addresses, setAddresses] = useState([]);
  const [cart, setCart] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const cartRes = await api.get(`/cart/${userId}`);
      setCart(cartRes.data);

      const addressRes = await api.get(`/address/${userId}`);
      setAddresses(addressRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!cart) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  const total =
    cart.items?.reduce(
      (sum, item) => sum + item.quantity * item.productId.price,
      0,
    ) || 0;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Address Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Select Address</h2>

          {addresses.length > 0 ? (
            addresses.map((a) => (
              <div
                key={a._id}
                className={`border p-4 rounded-lg mb-3 cursor-pointer ${
                  selectedAddress === a._id ? "border-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => setSelectedAddress(a._id)}
              >
                <h3 className="font-semibold">{a.fullName}</h3>

                <p>{a.phoneNumber}</p>

                <p>{a.addressLine}</p>

                <p>
                  {a.city}, {a.state}
                </p>

                <p>{a.pincode}</p>
              </div>
            ))
          ) : (
            <p>No address found</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          {cart.items?.map((item) => (
            <div
              key={item.productId._id}
              className="flex justify-between border-b py-3"
            >
              <span>
                {item.productId.title} × {item.quantity}
              </span>

              <span>₹{item.productId.price * item.quantity}</span>
            </div>
          ))}

          <div className="flex justify-between mt-6 text-xl font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            disabled={!selectedAddress}
          >
            Place Order (COD)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
