import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Book title is required"],
            trim: true,
            maxlength: [200, "Title cannot exceed 200 characters"],
        },
        author: {
            type: String,
            required: [true, "Author name is required"],
            trim: true,
        },
        isbn: {
            type: String,
            required: [true, "ISBN is required"],
            unique: true,
            trim: true,
        },
        genre: {
            type: String,
            required: [true, "Genre is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            maxlength: [1000, "Description cannot exceed 1000 characters"],
        },
        coverImage: {
            type: String,
            default: "",
        },
        publisher: {
            type: String,
            trim: true,
        },
        publishedYear: {
            type: Number,
            min: [1000, "Invalid published year"],
            max: [new Date().getFullYear(), "Published year cannot be in the future"],
        },
        totalCopies: {
            type: Number,
            required: [true, "Total copies is required"],
            min: [1, "At least 1 copy is required"],
        },
        availableCopies: {
            type: Number,
            min: [0, "Available copies cannot be negative"],
        },
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Set availableCopies = totalCopies when a book is first created
bookSchema.pre("save", function (next) {
    if (this.isNew) {
        this.availableCopies = this.totalCopies;
    }
    next();
});

// Virtual: is the book currently available?
bookSchema.virtual("isAvailable").get(function () {
    return this.availableCopies > 0;
});

// Enable virtuals in JSON/Object output
bookSchema.set("toJSON", { virtuals: true });
bookSchema.set("toObject", { virtuals: true });

// Full-text search index on title, author, genre
bookSchema.index({ title: "text", author: "text", genre: "text" });

const Book = mongoose.model("Book", bookSchema);
export default Book;
