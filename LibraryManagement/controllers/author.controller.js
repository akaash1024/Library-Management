const Author = require("../models/author.model");


const addNewAuthor = async (req, res, next) => {
  const { name, biography, nationality, dateOfBirth } = req.body
  try {
    const newAuthor = await Author.create({ name, biography, nationality, dateOfBirth })
    res.status(201).json({ success: true, message: "Author creataed successfully", newAuthor })
  } catch (error) {
    next(error);
  }
};

const getAllAuthor = async (req, res, next) => {
  try {
    
    
    const author = await Author.find({}).select("-books").populate("writtenBooks")
    
    res.status(200).json({ success: true, message: "Author fetched successfully", author })
  } catch (error) {
    next(error);
  }
};
const getAuthorById = async (req, res, next) => {
  const { id } = req.params
  try {
    const author = await Author.findById({ _id: id }).select("-books").populate("writtenBooks")
    if (author) {
      res.status(200).json({ success: true, message: "Author fetched successfully", author })
    }
  } catch (error) {
    next(error);
  }
};
const updateAuthorById = async (req, res, next) => {
  const { id } = req.params

  try {
    const author = await Author.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    res.status(200).json({ success: true, message: "Author updated successfully", author })

  } catch (error) {
    next(error);
  }
};
const deleteAuthorById = async (req, res, next) => {
  const { id } = req.params

  try {
    const author = await Author.findByIdAndDelete({ _id: id })
    res.status(200).json({ success: true, message: "Author deleleted successfully", author })
  } catch (error) {
    next(error);
  }
};

module.exports = { addNewAuthor, getAllAuthor, getAuthorById, deleteAuthorById, updateAuthorById };
