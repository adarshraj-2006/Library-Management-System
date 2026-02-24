import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [50, "Name cannot exceed 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false, // Never return password in queries
        },
        role: {
            type: String,
            enum: ["member", "librarian", "admin"],
            default: "member",
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            unique: true,
            match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"],
        },
        avatar: {
            type: String,
            default: "",
        },

        // ── Account Status ──────────────────────────────────────────
        isVerified: {
            type: Boolean,
            default: true,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },

        // ── Email Verification ──────────────────────────────────────
        emailVerifiedAt: {
            type: Date,
            default: null,
        },
        emailVerificationToken: {
            type: String,
            default: null,
        },
        emailVerificationExpiry: {
            type: Date,
            default: null,
        },

        // ── Password Reset ──────────────────────────────────────────
        passwordResetToken: {
            type: String,
            default: null,
        },
        passwordResetExpiry: {
            type: Date,
            default: null,
        },

        // ── Auth Tokens ─────────────────────────────────────────────
        refreshToken: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// ── Pre-save Hook: Hash password before saving ──────────────────────────────
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// ── Instance Method: Compare plaintext password with hashed ────────────────
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// ── Instance Method: Sanitize user object for responses ────────────────────
userSchema.methods.toSafeObject = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.refreshToken;
    delete obj.emailVerificationToken;
    delete obj.emailVerificationExpiry;
    delete obj.passwordResetToken;
    delete obj.passwordResetExpiry;
    return obj;
};

const User = mongoose.model("User", userSchema);
export default User;