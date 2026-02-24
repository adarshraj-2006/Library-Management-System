import mongoose from "mongoose";

const bookIssueSchema = new mongoose.Schema(
    {
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: [true, "Book reference is required"],
        },
        issuedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Member reference is required"],
        },
        issuedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Librarian/admin reference is required"],
        },
        issueDate: {
            type: Date,
            default: Date.now,
        },
        dueDate: {
            type: Date,
            required: [true, "Due date is required"],
        },
        returnDate: {
            type: Date,
            default: null,
        },
        status: {
            type: String,
            enum: ["issued", "returned", "overdue"],
            default: "issued",
        },
        fine: {
            type: Number,
            default: 0,
            min: [0, "Fine cannot be negative"],
        },
        finePaid: {
            type: Boolean,
            default: false,
        },
        remarks: {
            type: String,
            trim: true,
            maxlength: [500, "Remarks cannot exceed 500 characters"],
        },
    },
    {
        timestamps: true,
    }
);

// Virtual: overdue days (only meaningful before return)
bookIssueSchema.virtual("overdueDays").get(function () {
    const checkDate = this.returnDate || new Date();
    if (checkDate <= this.dueDate) return 0;
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.ceil((checkDate - this.dueDate) / msPerDay);
});

bookIssueSchema.set("toJSON", { virtuals: true });
bookIssueSchema.set("toObject", { virtuals: true });

// Index for fast lookups by member or status
bookIssueSchema.index({ issuedTo: 1, status: 1 });
bookIssueSchema.index({ dueDate: 1, status: 1 });

const BookIssue = mongoose.model("BookIssue", bookIssueSchema);
export default BookIssue;
