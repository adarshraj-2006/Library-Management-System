import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/user.model.js";
import Book from "./src/models/book.model.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // 1. Create Admin User
        let admin = await User.findOne({ role: "admin" });
        if (!admin) {
            console.log("Creating default admin...");
            admin = await User.create({
                name: "Admin User",
                email: "admin@lumina.com",
                password: "adminpassword123",
                phone: "1234567890",
                role: "admin",
                isVerified: true
            });
        }

        // 2. Clear Existing Books (Optional, but helps for a clean start with 31 books)
        await Book.deleteMany({});
        console.log("Cleared existing books catalog.");

        // 3. Add 31 Books from Assets
        console.log("Seeding 31 books from local assets...");

        const genres = ["Fiction", "Sci-Fi", "Programming", "Biography", "History", "Self-Help", "Fantasy", "Business"];
        const authors = ["James Clear", "Robert C. Martin", "F. Scott Fitzgerald", "J.R.R. Tolkien", "George Orwell", "Haruki Murakami", "Walter Isaacson", "Brené Brown", "Cal Newport"];
        const publishers = ["Lumina Press", "Oxford University Press", "Penguin Books", "HarperCollins", "Pearson Education"];

        const sampleBooks = [];
        for (let i = 1; i <= 31; i++) {
            const genre = genres[i % genres.length];
            const author = authors[i % authors.length];
            const publisher = publishers[i % publishers.length];

            sampleBooks.push({
                title: `Library Masterpiece Vol. ${i}`, // Placeholder titles, but structured
                author: author,
                isbn: `9780${Math.floor(100000000 + Math.random() * 900000000)}`,
                genre: genre,
                description: `A deep dive into the world of ${genre.toLowerCase()}. This volume covers essential principles and fascinating stories that have shaped modern thinking. Volume ${i} of our exclusive Lumina collection.`,
                totalCopies: 5 + (i % 5),
                publisher: publisher,
                publishedYear: 2010 + (i % 14),
                addedBy: admin._id,
                coverImage: `/assets/books/book${i}.jpg` // Local path from public folder
            });
        }

        // Add some specific famous titles for the first few
        if (sampleBooks[0]) {
            sampleBooks[0].title = "Shadow of the Wind";
            sampleBooks[0].author = "Carlos Ruiz Zafón";
        }
        if (sampleBooks[1]) {
            sampleBooks[1].title = "The Alchemist";
            sampleBooks[1].author = "Paulo Coelho";
        }
        if (sampleBooks[2]) {
            sampleBooks[2].title = "Deep Work";
            sampleBooks[2].author = "Cal Newport";
        }

        await Book.insertMany(sampleBooks);
        console.log(`✅ ${sampleBooks.length} books added successfully!`);

        console.log("✨ Seeding complete.");
        process.exit();
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

seedData();
