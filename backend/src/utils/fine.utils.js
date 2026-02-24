/**
 * Calculate overdue fine for a returned book.
 *
 * @param {Date} dueDate      - The date the book was due
 * @param {Date} returnDate   - The date the book was actually returned
 * @param {number} ratePerDay - Fine amount per day (default ₹5/day)
 * @returns {number} - Total fine amount in ₹ (0 if returned on time)
 */
export const calculateFine = (dueDate, returnDate = new Date(), ratePerDay = 5) => {
    const due = new Date(dueDate);
    const returned = new Date(returnDate);

    // No fine if returned on or before due date
    if (returned <= due) return 0;

    const msPerDay = 1000 * 60 * 60 * 24;
    const overdueDays = Math.ceil((returned - due) / msPerDay);

    return overdueDays * ratePerDay;
};

/**
 * Determine if a book issue is currently overdue.
 *
 * @param {Date} dueDate - Due date of the book
 * @returns {boolean}
 */
export const isOverdue = (dueDate) => {
    return new Date() > new Date(dueDate);
};
