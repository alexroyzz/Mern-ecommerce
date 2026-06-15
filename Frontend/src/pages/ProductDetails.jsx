import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  const location = useLocation();

  const loadProduct = async () => {
    try {
      const response = await api.get("/product");

      const foundProduct = response.data.find((item) => item._id === id);

      setProduct(foundProduct);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      if (!userId) {
        navigate("/login", {
          state: {
            from: location.pathname,
          },
        });
        return;
      }

      await api.post("/cart/add", {
        userId,
        productId: product._id,
      });

      window.dispatchEvent(new Event("cartUpdate"));
    } catch (error) {
      console.error("Add To Cart Error:", error);

      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl text-red-500">Product Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="space-y-3">
              <p className="text-3xl font-bold text-green-600">
                ₹{product.price}
              </p>

              <p>
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>

              <p>
                <span className="font-semibold">Stock:</span> {product.stock}
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={addToCart}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>

              <Link
                to="/"
                className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
