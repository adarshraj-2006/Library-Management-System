import BookIssue from "../models/bookIssue.model.js";
import Book from "../models/book.model.js";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { calculateFine, isOverdue } from "../utils/fine.utils.js";

// Default loan period in days
const DEFAULT_LOAN_DAYS = 14;

/**
 * POST /api/issues/issue
 * Protected — librarian, admin
 * Issue a book to a member.
 */
export const issueBook = asyncHandler(async (req, res) => {
    const { bookId, memberId, dueDate } = req.body;

    // Validate book
    const book = await Book.findById(bookId);
    if (!book || !book.isActive) {
        return errorResponse(res, "Book not found.", 404);
    }
    if (book.availableCopies <= 0) {
        return errorResponse(res, "No copies of this book are currently available.", 400);
    }

    // Validate member
    const member = await User.findById(memberId);
    if (!member || !member.isActive || member.isBlocked) {
        return errorResponse(res, "Member not found or account is inactive/blocked.", 404);
    }

    // Check member doesn't have the same book already issued
    const alreadyIssued = await BookIssue.findOne({
        book: bookId,
        issuedTo: memberId,
        status: "issued",
    });
    if (alreadyIssued) {
        return errorResponse(res, "This member already has an active issue for this book.", 409);
    }

    // Compute due date
    const computedDueDate = dueDate
        ? new Date(dueDate)
        : new Date(Date.now() + DEFAULT_LOAN_DAYS * 24 * 60 * 60 * 1000);

    if (computedDueDate <= new Date()) {
        return errorResponse(res, "Due date must be in the future.", 400);
    }

    // Create issue record and decrement available copies atomically
    const [issue] = await Promise.all([
        BookIssue.create({
            book: bookId,
            issuedTo: memberId,
            issuedBy: req.user._id,
            dueDate: computedDueDate,
        }),
        Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: -1 } }),
    ]);

    await issue.populate([
        { path: "book", select: "title author isbn" },
        { path: "issuedTo", select: "name email phone" },
        { path: "issuedBy", select: "name role" },
    ]);

    return successResponse(res, issue, "Book issued successfully.", 201);
});

/**
 * POST /api/issues/return
 * Protected — librarian, admin
 * Return a book and calculate any fine.
 */
export const returnBook = asyncHandler(async (req, res) => {
    const { issueId } = req.body;

    const issue = await BookIssue.findById(issueId);
    if (!issue) {
        return errorResponse(res, "Issue record not found.", 404);
    }
    if (issue.status === "returned") {
        return errorResponse(res, "This book has already been returned.", 400);
    }

    const returnDate = new Date();
    const fine = calculateFine(issue.dueDate, returnDate);

    issue.returnDate = returnDate;
    issue.status = "returned";
    issue.fine = fine;

    await Promise.all([
        issue.save(),
        Book.findByIdAndUpdate(issue.book, { $inc: { availableCopies: 1 } }),
    ]);

    await issue.populate([
        { path: "book", select: "title author isbn" },
        { path: "issuedTo", select: "name email phone" },
    ]);

    return successResponse(
        res,
        { issue, fine, message: fine > 0 ? `Fine of ₹${fine} has been calculated.` : "Returned on time. No fine." },
        "Book returned successfully."
    );
});

/**
 * GET /api/issues/my
 * Protected — member
 * Get the authenticated member's own issue history.
 */
export const getMyIssuedBooks = asyncHandler(async (req, res) => {
    const { status, page = 1, limit = 10 } = req.query;
    const query = { issuedTo: req.user._id };
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [issues, total] = await Promise.all([
        BookIssue.find(query)
            .populate("book", "title author isbn coverImage genre")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit)),
        BookIssue.countDocuments(query),
    ]);

    // Flag overdue issues in response
    const enriched = issues.map((i) => {
        const obj = i.toObject();
        if (i.status === "issued") obj.isCurrentlyOverdue = isOverdue(i.dueDate);
        return obj;
    });

    return successResponse(
        res,
        {
            issues: enriched,
            pagination: { total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) },
        },
        "Issued books fetched successfully."
    );
});

/**
 * GET /api/issues/all
 * Protected — librarian, admin
 * Get all issue records with optional filters.
 */
export const getAllIssuedBooks = asyncHandler(async (req, res) => {
    const { status, memberId, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (memberId) query.issuedTo = memberId;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [issues, total] = await Promise.all([
        BookIssue.find(query)
            .populate("book", "title author isbn")
            .populate("issuedTo", "name email phone")
            .populate("issuedBy", "name role")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit)),
        BookIssue.countDocuments(query),
    ]);

    return successResponse(
        res,
        {
            issues,
            pagination: { total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) },
        },
        "All issued books fetched successfully."
    );
});

/**
 * GET /api/issues/overdue
 * Protected — librarian, admin
 * Get all currently overdue issues. Also marks them as overdue in DB.
 */
export const getOverdueBooks = asyncHandler(async (req, res) => {
    const now = new Date();

    // Bulk update any issued → overdue records
    await BookIssue.updateMany(
        { status: "issued", dueDate: { $lt: now } },
        { $set: { status: "overdue" } }
    );

    const issues = await BookIssue.find({ status: "overdue" })
        .populate("book", "title author isbn")
        .populate("issuedTo", "name email phone")
        .sort({ dueDate: 1 });

    const enriched = issues.map((i) => {
        const obj = i.toObject();
        obj.currentFine = calculateFine(i.dueDate, now);
        return obj;
    });

    return successResponse(res, enriched, `${enriched.length} overdue book(s) found.`);
});
