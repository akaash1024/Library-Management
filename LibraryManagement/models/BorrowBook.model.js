const mongoose = require("mongoose");

const borrowBooksSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    borrowDate: { type: Date, default: () => new Date() },
    dueDate: {
      type: Date,
      default: function () {
        const dueDate = new Date();
        const daysToAdd = parseInt(process.env.DUE_DATE) || 14;
        dueDate.setDate(dueDate.getDate() + daysToAdd);
        return dueDate;
      }
    },
    returnDate: { type: Date },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
  },
  {
    timestamps: false,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

// Corrected virtuals
borrowBooksSchema.virtual("bookDetails", {
  ref: "Book",
  localField: "book",         // Contains Book ID
  foreignField: "_id",        // Match with Book's _id
  justOne: true              // Since it's a single book
});

borrowBooksSchema.virtual("userDetails", {
  ref: "User",
  localField: "member",       // Contains User ID
  foreignField: "_id",        // Match with User's _id
  justOne: true              // Since it's a single user
});

const BorrowBook = mongoose.model("BorrowBook", borrowBooksSchema);

module.exports = BorrowBook;