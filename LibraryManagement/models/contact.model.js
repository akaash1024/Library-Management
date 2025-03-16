const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String, required: true },
    },
    { versionKey: false }
);

// create a model or a collection
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
