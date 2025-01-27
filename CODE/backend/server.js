const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator"); // For email validation
const connectDB = require("./DB")
const cors = require("cors")


const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors())
connectDB()
// Schema and model definition
const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Invalid email address"],
  },
  message: {
    type: String,
    required: true,
    minlength: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

// POST route to handle contact form submission
app.post("/contact", async (req, res) => {
  const { email, message } = req.body;

  // Check if email and message are provided
  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required" });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Create and save the contact document
  try {
    const contact = new Contact({ email, message });
    await contact.save();
    res.status(201).json({ message: "Contact message saved successfully" });
  } catch (err) {
    console.error("Error saving contact message:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is live on http://localhost:5000");
});

