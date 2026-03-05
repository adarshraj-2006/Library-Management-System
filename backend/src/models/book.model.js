import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    trim: true
  },

  author: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  category: {
    type: String,
    required: true
  },

  isbn: {
    type: String,
    unique: true
  },

  publisher: {
    type: String
  },

  publishedYear: {
    type: Number
  },

  coverImage: {
    type: String
  },

  totalCopies: {
    type: Number,
    default: 1
  },

  availableCopies: {
    type: Number,
    default: 1
  },

  ratings: {
    type: Number,
    default: 4
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},

);

export default mongoose.model("Book", bookSchema);