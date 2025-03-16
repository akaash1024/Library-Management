const { contactForm, getAllContacts, deleteContactById } = require("../controllers/contact.controller");



const contactRoute = require("express").Router()

contactRoute.route("/contact").get(getAllContacts)

contactRoute.route("/contact/:id").delete(deleteContactById)




module.exports = contactRoute;
