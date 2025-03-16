const Contact = require("../models/contact.model");


const contactForm = async (req, res, next) => {
    console.log(req.body);
    try {

        const response = req.body;

        await Contact.create(response);
        return res
            .status(200)
            .json({ success: true, message: "Message send successfully" });
    } catch (error) {
        next(error);
    }
};


const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});

        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No Contacts Found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};



const deleteContactById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        return res
            .status(200)
            .json({ message: "Contact deleted successfully", deletedContact });
    } catch (error) {
        next(error); 
    }
};



module.exports = { contactForm, getAllContacts, deleteContactById };
