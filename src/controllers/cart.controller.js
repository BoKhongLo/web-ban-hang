import express from("express");
import Cart from("../models/Cart");
import Product from("../models/Product");

const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.session.cartId)
      .populate("items.productId")
      .exec();

    if (!cart) {
      return res.render("cart", {
        title: "Giỏ hàng",
        items: [],
        totalPrice: 0,
      });
    }

    const cartItems = cart.items.map((item) => ({
      ...item,
      product: item.productId,
    }));

    const totalPrice = cartItems.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );

    res.render("cart", {
      title: "Giỏ hàng",
      items: cartItems,
      totalPrice: totalPrice,
    });
  } catch (error) {
    console.error(error);
    next(error); // Pass error to middleware for handling
  }
};
const addProductToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Sản phẩm không tìm thấy" });
    }

    let cart = await Cart.findById(req.session.cartId);
    if (!cart) {
      const newCart = new Cart({
        items: [{ productId, quantity }],
      });
      await newCart.save();
      req.session.cartId = newCart._id;
      cart = newCart;
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId.toString()
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    }

    res.json({ message: "Thêm sản phẩm vào giỏ hàng thành công" });
  } catch (error) {
    console.error(error);
    next(error); // Pass error to middleware for handling
  }
};
const updateCartItemQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findById(req.session.cartId);
    if (!cart) {
      return res.status(400).json({ error: "Giỏ hàng trống" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    );
    if (!item) {
      return res.status(400).json({ error: "Sản phẩm không có trong giỏ hàng" });
    }

    item.quantity = quantity;
    await cart.save();

    res.json({ message: "Cập nhật số lượng sản phẩm thành công" });
  } catch (error) {
    console.error(error);
    next(error); // Pass error to middleware for handling
  }
};
const removeProductFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findById(req.session.cartId);
    if (!cart) {
      return res.status(400).json({ error: "Giỏ hàng trống" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );
    if (itemIndex === -1) {
      return res.status(400).json({ error: "Sản phẩm không có trong giỏ hàng" });
    }

    // Xóa sản phẩm khỏi danh sách items
    cart.items.splice(itemIndex, 1);

    // Cập nhật lại giỏ hàng
    await cart.save();

    // Gửi phản hồi thành công
    res.json({ message: "Xóa sản phẩm khỏi giỏ hàng thành công" });
  } catch (error) {
    console.error(error);
    next(error); // Pass error to middleware for handling
  }
};

export default {
  getCart,
  removeProductFromCart,
  updateCartItemQuantity,
  addProductToCart
}