import UserModel from "../models/UserModel.js";

// ========================== ADD TO CART ==========================
export const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    const user = await UserModel.findOneAndUpdate(
      { _id: req.userId }, // get userId from JWT
      { $inc: { [`cartData.${itemId}`]: 1 } },
      { new: true } // return updated user
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Item added to cart", cartData: user.cartData });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ========================== REMOVE FROM CART ==========================
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    const user = await UserModel.findOneAndUpdate(
      { _id: req.userId }, // get userId from JWT
      { $unset: { [`cartData.${itemId}`]: "" } }, // remove item
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Item removed from cart", cartData: user.cartData });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ========================== GET CART ==========================
export const getCart = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cartData: user.cartData });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
