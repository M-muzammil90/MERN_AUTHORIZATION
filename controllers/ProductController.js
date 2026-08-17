import Product from "../models/ProductModels.js";
import cloudinary from "../utils/cloudinary.js";



const getproduct = async (req, res) => {
  try {
    const allproduct = await Product.find({});
    res.json(allproduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const GetProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const CreateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
   let ImageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result)
      ImageUrl = result.secure_url;
      console.log("FILE:", req.file);
    }

    const NewProduct = new Product(
     { name,
      description,
      price,
      category,
      stock,
       images: ImageUrl,}
    );

    const saveProduct = await NewProduct.save();

    res.status(200).json({
      message: "Product succesfuly created",
      success: true,
      saveProduct,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.stock = stock || product.stock;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);
        product.ImageUrl = result.secure_url;
      } 
    }else {
        res.status(404).json({ messgae: "Product not found" });
      }

    const saveProduct = await product.save();

    res.json(saveProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.log("DELETE PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Product deletion failed",
      error: error.message,
    });
  }
};

export {getproduct,GetProductById,CreateProduct,updateProduct,deleteProduct}