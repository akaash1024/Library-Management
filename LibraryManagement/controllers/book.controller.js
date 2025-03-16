const Author = require("../models/author.model");
const Book = require("../models/book.model");


const addNewBook = async (req, res, next) => {
  const { title, ISBN, summary, publicationDate, genres, copiesAvailable, author, borrowedBy } = req.body;

  try {

    const existingAuthor = await Author.findById({_id:author});
    if (!existingAuthor) {
      return res.status(400).json({ success: false, message: "Author not found" });
    }

    const newBook = await Book.create({ title, ISBN, summary, publicationDate, genres, copiesAvailable, author, borrowedBy });

    await Author.findByIdAndUpdate(author, { $push: { books: newBook._id } });

    res.status(201).json({ success: true, message: "Book added successfully", newBook });
  } catch (error) {
    next(error);
  }
};



const getAllBook = async (req, res, next) => {
  try {
    const books = await Book.find({}).populate("authorDetails").populate("borrowers");
    res.status(200).json({ success: true, message: "Book Fetched Successfully", books })
  } catch (error) {
    next(error);
  }
};
const getBookById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findById({ _id: id, }).populate("authorDetails").populate("borrowers")
    if (!book) {
      return res.status(404).json({success: false,  message: "Book not found" });
    }
    res.status(200).json({ success: true, message: "Book fetched Successfully", book })
  } catch (error) {
    next(error);
  }
};
const updateBookById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndUpdate({ _id: id, }, req.body, { new: true }).populate("authorDetails").populate("borrowers")
    res.status(200).json({ success: true, message: "Book updated Successfully", book })
  } catch (error) {
    next(error);
  }
};
const deleteBookById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete({ _id: id, })

    // ! this is very importatnt while i was debugging 
    // ! need to update when i come next
    // ? await Post.findByIdAndUpdate(comment.post, { $pull: { comments: id } });

    res.status(200).json({ success: true, message: "Book deleted Successfully", book })
  } catch (error) {
    next(error);
  }
};

module.exports = { addNewBook, getAllBook, getBookById, deleteBookById, updateBookById };
