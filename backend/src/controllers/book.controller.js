import Book from "../models/book.model.js";

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ success: true, books });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}   