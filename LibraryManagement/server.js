const express = require("express");
const path = require("path");
const connectDB = require("./database/db");
const errorMiddleware = require("./middlewares/error.middleware");

const authRoute = require("./routes/auth.route");
const authorRoute = require("./routes/author.route");
const bookRoute = require("./routes/book.route");
const borrowingsBooksRoute = require("./routes/borrowingBook.route");
const contactRoute = require("./routes/contact.route");
const adminRoute = require("./routes/admin.route");

const cors = require("cors");
const { contactForm } = require("./controllers/contact.controller");
const mongoose = require("mongoose");



const app = express();

// ! middlewares
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// ? routes
app.get("/", (req, res) => {
  res.render("index");
});


//  ? general route
app.route("/api/contact").post(contactForm)

app.use("/api/auth", authRoute);
app.use("/api/authors", authorRoute);
app.use("/api/books", bookRoute);
app.use("/api/borrowings", borrowingsBooksRoute);

// ? admin
app.use("/api/admin", contactRoute)
app.use("/api/admin", adminRoute)

// !  for testing only. IGNORE
app.get("/health", async (req, res) => {
  try {
    // Check if database is connected
    const state = mongoose.connection.readyState;
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };
    res.json({
      status: "ok",
      database: states[state],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// ! error handling part

// // * error handling part
// app.use(errorHandleMiddleware)

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorMiddleware);



// ! connetion to mongo atlas database
const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`⚙️ Server is listening at http://localhost:${PORT}`);
  });
});
