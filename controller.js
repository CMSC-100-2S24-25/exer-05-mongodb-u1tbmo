import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/StudentDatabase";
// Connect to local MongoDB server
try {
	await mongoose.connect(MONGODB_URI);
	console.log("Connected to MongoDB");
} catch (error) {
	console.log(error);
}
// Create a Student model
const Student = mongoose.model("Student", {
	stdnum: String,
	fname: String,
	lname: String,
	age: Number,
});

// Saves a student to the database
const saveStudent = (req, res) => {};

// Updates the first name of a student in the database
const updateStudentFirstName = (req, res) => {}; 

// Removes a specific user from the database
const removeUser = (req, res) => {}; 

// Removes all users from the database (dangerous)
const removeAllUsers = (req, res) => {}; 

// Retrieves a user from the database
const getUser = (req, res) => {}; 

// Retrives all users from the database
const getMembers = (req, res) => {};

export {
	saveStudent,
	updateStudentFirstName,
	removeUser,
	removeAllUsers,
	getUser,
	getMembers,
};
