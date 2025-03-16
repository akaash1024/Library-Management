const mongoose = require("mongoose")
const Book = require("../models/book.model");

const BorrowBook = require("../models/BorrowBook.model");
const User = require("../models/user.model");




const borrowABook = async (req, res, next) => {
  const { bookId } = req.body;
  const userID = req.userID;

  try {

    const book = await Book.findById(bookId);
    if (!book) return res.status(400).json({ success: false, message: "Book not found" });


    if (book.copiesAvailable <= 0) {
      return res.status(400).json({ success: false, message: "No copies available" });
    }


    const user = await User.findById(userID);
    if (!user) return res.status(400).json({ success: false, message: "User not found" });


    const newBorrowTransaction = await BorrowBook.create({
      bookName: book.title,
      memberName: user.name,
      member: user._id,
      book: book._id,
      borrowDate: new Date(),
    });


    user.borrowedBooks.push(book._id);
    book.borrowedBy.push(user._id);
    book.copiesAvailable -= 1;

    await Promise.all([user.save(), book.save()]);

    res.status(200).json({ success: true, message: "Book borrowed successfully", newBorrowTransaction });
  } catch (error) {
    next(error);
  }
};


const getBorrowedBooksTransactions = async (req, res, next) => {
  try {
    const borrowedTransactions = await BorrowBook.find({}).select("member book")

    res.status(200).json({
      success: true,
      message: "Borrowed Books Transactions",
      data: borrowedTransactions
    });

  } catch (error) {
    next(error);
  }
};



const getUserBorrowingLogs = async (req, res, next) => {
  const userID = req.userID;

  try {
    // Find user and populate their borrowed books
    const user = await User.findById(userID)
      .populate({ path: 'borrowedBooks', select: 'title author genres' }) // ? Select only needed fields
      .select("-password -isAdmin");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find all borrow transactions for this user
    const borrowedHistory = await BorrowBook.find({ member: userID })
      .populate({ path: 'book', select: 'title author' })
      .sort({ borrowDate: -1 });  // Most recent first

    res.status(200).json({
      success: true,
      message: "User borrowing logs fetched successfully",
      user,
      borrowedHistory
    });

  } catch (error) {
    console.error("Error fetching user logs:", error);
    next(error);
  }
};


const returnBorrowedBook = async (req, res, next) => {
  const { bookId } = req.body;
  const userID = req.userID;

  console.log("Akashd", bookId, userID)

  try {
    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ success: false, message: "Invalid book ID format" });
    }

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });

    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Find the active borrow transaction
    const borrowTransaction = await BorrowBook.findOne({
      book: bookId,
      member: userID,
      status: "borrowed"
    });

    if (!borrowTransaction) {
      return res.status(404).json({ success: false, message: "No active borrow transaction found for this book" });
    }

    // ! Check if book is overdue
    const now = new Date();
    const isOverdue = now > borrowTransaction.dueDate;

    // ! Mark the transaction as returned
    borrowTransaction.status = "returned";
    borrowTransaction.returnDate = now;

    // ! Update book availability
    book.copiesAvailable += 1;
    book.borrowedBy.pull(userID);

    // ! Update user's borrowed books
    user.borrowedBooks.pull(bookId);

    // ! Save all changes in parallel
    await Promise.all([
      borrowTransaction.save(),
      book.save(),
      user.save()
    ]);

    // ! Return appropriate response
    if (isOverdue) {
      return res.status(200).json({
        success: true,
        message: "Book returned successfully but was overdue",

        // ? need to check this calculation 
        daysOverdue: Math.ceil((now - borrowTransaction.dueDate) / (1000 * 60 * 60 * 24))
      });
    }

    res.status(200).json({ success: true, message: "Book returned successfully" });

  } catch (error) {
    console.error("Error returning book:", error);
    next(error);
  }
};


module.exports = {
  borrowABook,
  getBorrowedBooksTransactions,
  getUserBorrowingLogs,
  returnBorrowedBook,
};
