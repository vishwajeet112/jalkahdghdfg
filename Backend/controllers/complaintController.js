// controllers/complaintController.js

const Complaint = require("../models/complaint");

// Handle form submission
exports.submitComplaint = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create a new complaint instance
    const newComplaint = new Complaint({
      name,
      email,
      subject,
      message,
    });

    // Save the complaint to the database
    const savedComplaint = await newComplaint.save();

    res.status(201).json({
      message: "Complaint submitted successfully",
      data: savedComplaint,
    });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).json({ message: "Failed to submit complaint" });
  }
};
