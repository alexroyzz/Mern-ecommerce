import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const loadProducts = async () => {
    try {
      const response = await api.get(
        `/product?search=${search}&category=${category}`,
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = async (productId) => {
    try {
      if (!userId) {
        navigate("/login");
        return;
      }

      await api.post("/cart/add", {
        userId,
        productId,
      });

      window.dispatchEvent(new Event("cartUpdate"));
    } catch (error) {
      console.error("Add To Cart Error:", error);
      alert("Failed to add product");
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      <section className="bg-linear-to-r from-blue-50 via-white to-indigo-50">
        
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
            Find Your Next
            <span className="text-blue-600"> Favorite Product</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Premium gadgets, electronics and fashion products delivered to your
            doorstep.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            Shop Now
          </button>
        </div>
      </section>
      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-lg">🚚 Fast Delivery</h3>
            <p className="text-gray-500 mt-2">Quick delivery on all orders.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-lg">🔒 Secure Payment</h3>
            <p className="text-gray-500 mt-2">
              Safe and trusted payment methods.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-lg">⭐ Best Quality</h3>
            <p className="text-gray-500 mt-2">
              Carefully selected premium products.
            </p>
          </div>
        </div>
      </section>
      {/* Search */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-gray-100 px-4 py-3 rounded-xl outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-100 px-4 py-3 rounded-xl outline-none"
          >
            <option value="">All Categories</option>
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>
      </section>
      {/* Products */}
      <section id="products" className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Products
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-5">
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {product.category}
                  </span>

                  <h2 className="text-xl font-bold mt-3 line-clamp-1">
                    {product.title}
                  </h2>

                  <p className="text-gray-600 mt-2 line-clamp-2 text-sm">
                    {product.description}
                  </p>

                  <div className="mt-3">
                    <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                  </div>

                  <p className="text-2xl font-bold text-green-600 mt-3">
                    ₹{product.price}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Stock: {product.stock}
                  </p>

                  <div className="flex gap-2 mt-5">
                    <Link
                      to={`/productdetails/${product._id}`}
                      className="flex-1 bg-black text-white text-center py-3 rounded-xl hover:bg-gray-800 transition"
                    >
                      Details
                    </Link>

                    <button
                      onClick={() => addToCart(product._id)}
                      className="bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-700 transition"
                    >
                      🛒
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <h3 className="text-2xl font-bold text-gray-700">
                No Products Found
              </h3>

              <p className="text-gray-500 mt-2">
                Try another search or category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default Home;
