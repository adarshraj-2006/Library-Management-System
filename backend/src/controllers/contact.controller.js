import Contact from "../models/contact.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

/**
 * POST /api/contacts
 * Public — Submit a contact form.
 */
export const submitContact = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
        name,
        email,
        subject,
        message
    });

    return successResponse(res, contact, "Message sent successfully. We will get back to you soon!", 201);
});

/**
 * GET /api/contacts
 * Protected — admin only
 */
export const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return successResponse(res, contacts, "Contacts fetched successfully.");
});
