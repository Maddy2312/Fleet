import { stockOfVariant } from "../dao/product.dao.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addToCart = async (req, res) => {
  const { productId, variantId } = req.params;
  const { quantity } = req.body;
  const product = await productModel.findOne({
    _id: productId,
    "variants._id": variantId,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product or variant not found",
    });
  }

  const cart =
    (await cartModel.findOne({ user: req.user._id })) ||
    (await cartModel.create({ user: req.user._id }));

  const isProductAlreadyInCart = cart.items.some(
    (item) =>
      item.product.toString() === productId &&
      item.variant?.toString() === variantId,
  );
  if (isProductAlreadyInCart) {
    const quantityInCart = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    ).quantity;
    if (
      quantityInCart + quantity >
      (await stockOfVariant(productId, variantId))
    ) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      });
    }
    await cartModel.findOneAndUpdate(
      {
        user: req.user._id,
        "items.product": productId,
        "items.variant": variantId,
      },
      { $inc: { "items.$.quantity": quantity } },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
    });
  }
  if (quantity > (await stockOfVariant(productId, variantId))) {
    return res.status(400).json({
      success: false,
      message: "Not enough stock available",
    });
  }
  cart.items.push({
    product: productId,
    variant: variantId,
    quantity,
    price: product.price,
  });
  await cart.save();
  return res.status(200).json({
    success: true,
    message: "Product added to cart successfully",
  });
};

export const getCart = async (req, res) => {
  const user = req.user;
  let cart = await cartModel
    .findOne({ user: user._id })
    .populate("items.product");
  if (!cart) {
    cart = await cartModel.create({ user: user._id });
  }
  return res.status(200).json({
    message: "Cart retrieved successfully",
    success: true,
    cart,
  });
};

export const updateQuantity = async (req, res) => {
  const { productId, variantId } = req.params;
  const product = await productModel.findOne({
    _id: productId,
    "variants._id": variantId,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product or variant not found",
    });
  }

  const cart = await cartModel.findOne({ user: req.user._id });
  if(!cart) {
    return res.status(404).json({
        success: false,
        message:  "Cart not found",
    })
  }
  const stock = await stockOfVariant(productId, variantId);
  const itemquantity = cart.items.find(
    (item) =>
      item.product.toString() === productId &&
      item.variant?.toString() === variantId,
  )?.quantity || 0;
    if (itemquantity + 1 > stock) {
        return res.status(400).json({
            success: false,
            message: "Not enough stock available",
        })
    }
  await cartModel.findOneAndUpdate(
    {
      user: req.user._id,
      "items.product": productId,
      "items.variant": variantId,
    },
    { $inc: { "items.$.quantity": 1 } },
    { new: true },
  );
    return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
    })
};
