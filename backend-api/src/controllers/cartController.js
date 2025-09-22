import UserModel from "../models/UserModel.js";

// Add items to user cart 
export const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const user = await UserModel.findOneAndUpdate(
            { _id: userId },
            { 
                $inc: { [`cartData.${itemId}`]: 1 } 
            },
            { new: true } // Return the updated user
        );
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ message: "Item added to cart", cartData: user.cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Remove items from user cart
export const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const user = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $unset: { [`cartData.${itemId}`]: "" } }, // Remove item from cart
            { new: true } 
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Item removed from cart", cartData: user.cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Fetch user cart data
export const getCart = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId); // Using userId from JWT
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ cartData: user.cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
