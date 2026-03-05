import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "../models/Book.js";
import books from "./booksData.js";

dotenv.config();

const seedBooks = async () => {
try {

await mongoose.connect(process.env.MONGO_URI);

await Book.deleteMany(); // clear existing books

await Book.insertMany(books);

console.log("Books Seeded Successfully");

process.exit();

} catch (error) {
console.log(error);
process.exit(1);
}
};

seedBooks();