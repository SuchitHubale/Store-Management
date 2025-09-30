import { Item } from "../model/Item.js";

// CREATE ITEM
export const createItem = async (req, res) => {
  try {
    const { itemName, quantity, description, category } = req.body;

    const newItem = new Item({
      itemName,
      quantity,
      description,
      category,
    });

    await newItem.save();
    res
      .status(201)
      .json({ message: "Item created successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error creating item", error });
  }
};

// GET ALL ITEMS
export const getItems = async (req, res) => {
  try {
    const items = await Item.find(); // ❌ remove populate
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

// GET ITEM BY ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id); // ❌ no populate
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error });
  }
};

// UPDATE ITEM
export const updateItem = async (req, res) => {
  try {
    const { itemName, quantity, description, category } = req.body;
    let updateData = { itemName, quantity, description, category };

    const item = await Item.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
};

// DELETE ITEM
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};