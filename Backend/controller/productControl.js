import Product from "../models/Product.js";

//product creation
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.json({
      message: "product successfully created",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: "an error occur",
      error,
    });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    let products = await Product.find().sort({ createdAt: -1 });

    if (search) {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category) {
      products = products.filter((product) => product.category === category);
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
// Update Product
export const updatedProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      message: "Product updated successfully",
      updated,
    });
  } catch (error) {
    res.status(400).json({
      message: "Server error",
      error,
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product successfully deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: "Server error",
      error,
    });
  }
};
