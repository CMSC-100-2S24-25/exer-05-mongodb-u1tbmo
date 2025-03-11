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
const Student = mongoose.model(
	"Student",
	{
		stdnum: {
			type: String,
			required: [true, "Student number is required."],
		},
		fname: {
			type: String,
			required: [true, "First name is required"],
		},
		lname: {
			type: String,
			required: [true, "Last name is required"],
		},
		age: {
			type: Number,
			required: [true, "Age is required"],
		},
	},
	"studentData",
);

// Saves a student to the database
const saveStudent = async (req, res) => {
	try {
		// The body contains ALL the fields of the Student model
		const newStudent = new Student(req.body);

		// Check for duplicate student number
		const existingStudent = await Student.findOne({
			stdnum: newStudent.stdnum,
		});
		if (existingStudent) {
			return res.send({ inserted: false });
		}

		// Add the student to the database
		await newStudent.save();
		return res.send({ inserted: true });
	} catch (error) {
		// The student was not added.
		return res.send({ inserted: false });
	}
};

// Updates the first name of a student in the database
const updateStudentFirstName = async (req, res) => {};

// Removes a specific user from the database
const removeUser = async (req, res) => {};

// Removes all users from the database (dangerous)
const removeAllUsers = async (req, res) => {};

// Retrieves a user from the database
const getUser = async (req, res) => {};

// Retrives all users from the database
const getMembers = async (req, res) => {};

export {
	saveStudent,
	updateStudentFirstName,
	removeUser,
	removeAllUsers,
	getUser,
	getMembers,
};
