import Book from "../models/book.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

/**
 * POST /api/books
 * Protected — admin, librarian only
 * Add a new book to the library catalogue.
 */
export const addBook = asyncHandler(async (req, res) => {
    const { title, author, isbn, genre, description, totalCopies, coverImage, publisher, publishedYear } = req.body;

    const existing = await Book.findOne({ isbn });
    if (existing) {
        return errorResponse(res, `A book with ISBN "${isbn}" already exists.`, 409);
    }

    const book = await Book.create({
        title,
        author,
        isbn,
        genre,
        description,
        totalCopies,
        coverImage,
        publisher,
        publishedYear,
        addedBy: req.user._id,
    });

    return successResponse(res, book, "Book added successfully.", 201);
});

/**
 * GET /api/books
 * Public — Get all active books with optional search, filter, and pagination.
 * Query params: search, genre, page, limit
 */
export const getAllBooks = asyncHandler(async (req, res) => {
    const { search, genre, page = 1, limit = 12 } = req.query;
    const query = { isActive: true };

    if (search) {
        query.$text = { $search: search };
    }
    if (genre) {
        query.genre = { $regex: genre, $options: "i" };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [books, total] = await Promise.all([
        Book.find(query)
            .populate("addedBy", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit)),
        Book.countDocuments(query),
    ]);

    return successResponse(
        res,
        {
            books,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit)),
            },
        },
        "Books fetched successfully."
    );
});

/**
 * GET /api/books/:id
 * Public — Get a single book by its MongoDB ID.
 */
export const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("addedBy", "name email");

    if (!book || !book.isActive) {
        return errorResponse(res, "Book not found.", 404);
    }

    return successResponse(res, book, "Book fetched successfully.");
});

/**
 * PUT /api/books/:id
 * Protected — admin, librarian only
 * Update book details (except availableCopies which is managed by issue/return).
 */
export const updateBook = asyncHandler(async (req, res) => {
    const { availableCopies, addedBy, ...updateData } = req.body; // strip managed fields

    const book = await Book.findById(req.params.id);
    if (!book || !book.isActive) {
        return errorResponse(res, "Book not found.", 404);
    }

    // If totalCopies is being reduced, ensure it's not below current issued count
    if (updateData.totalCopies !== undefined) {
        const issuedCount = book.totalCopies - book.availableCopies;
        if (updateData.totalCopies < issuedCount) {
            return errorResponse(
                res,
                `Cannot reduce total copies below currently issued count (${issuedCount}).`,
                400
            );
        }
        // Adjust available copies proportionally
        const diff = updateData.totalCopies - book.totalCopies;
        updateData.availableCopies = book.availableCopies + diff;
    }

    const updated = await Book.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true, runValidators: true }
    ).populate("addedBy", "name email");

    return successResponse(res, updated, "Book updated successfully.");
});

/**
 * DELETE /api/books/:id
 * Protected — admin only
 * Soft-delete a book (sets isActive: false).
 */
export const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book || !book.isActive) {
        return errorResponse(res, "Book not found.", 404);
    }

    if (book.availableCopies < book.totalCopies) {
        return errorResponse(res, "Cannot delete a book with currently issued copies. Return all copies first.", 400);
    }

    book.isActive = false;
    await book.save();

    return successResponse(res, null, "Book deleted successfully.");
});
