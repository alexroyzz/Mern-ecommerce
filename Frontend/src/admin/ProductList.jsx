import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await api.get("/product");

      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/product/delete/${id}`);

      alert("Product deleted successfully!");
      loadProducts();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product List</h2>

        <Link
          to="/admin/products/add"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td className="border p-2">{product.title}</td>
                <td className="border p-2">₹{product.price}</td>
                <td className="border p-2">{product.stock}</td>
                <td className="border p-2">{product.category}</td>

                <td className="border p-2 space-x-3">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="text-blue-500"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
