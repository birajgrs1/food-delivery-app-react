import FoodModel from "../models/FoodModel.js";
import fs from "fs/promises";

export const addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  const newFood = new FoodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: imageUrl,
    category: req.body.category,
  });

  try {
    await newFood.save();
    return res.status(201).json({
      message: "Food item added successfully",
      food: newFood,
    });
  } catch (error) {
    try {
      await fs.unlink(`uploads/${req.file.filename}`);
    } catch (fsError) {
      console.error("Failed to delete image", fsError);
    }

    return res.status(500).json({
      message: "Failed to add food item",
      error: error.message,
    });
  }
};

// All food list
export const foodList = async (req, res) => {
  try {
    const foods = await FoodModel.find();
    return res.status(200).json(foods);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch food items",
      error: error.message,
    });
  }
};

// Remove food item
export const removeFood = async (req, res) => {
  try {
    const food = await FoodModel.findOne({ _id: req.body.id });
    if (!food || !food.image) {
      return res.status(400).json({
        message: "Food item or image not found",
      });
    }

    const imageFileName = food.image.split('/').pop(); 

    await fs.unlink(`uploads/${imageFileName}`);
    await FoodModel.deleteOne({ _id: req.body.id });

    return res.status(200).json({ message: "Food item removed successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to remove food item",
      error: error.message,
    });
  }
};
