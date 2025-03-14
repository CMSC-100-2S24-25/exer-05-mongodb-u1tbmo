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
			minLength: 1,
		},
		fname: {
			type: String,
			required: [true, "First name is required"],
			minLength: 1,
		},
		lname: {
			type: String,
			required: [true, "Last name is required"],
			minLength: 1,
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
const updateStudent = async (req, res) => {
	// This is the existing student that will be updated (Clint Salmon)
	const userToUpdate = "5615273380";

	// Retrieve the first name from the request body
	const { fname } = req.body;

	// Update "Clint Salmon" to "{fname} Parker" and sure to validate
	// Note: A response is sent for consistency and testability
	try {
		const result = await Student.updateOne(
			{ stdnum: userToUpdate },
			{ fname: fname, lname: "Parker" },
			{ runValidators: true },
		);

		// Check if student was modified
		if (result.modifiedCount > 0) {
			return res.send({ updated: true });
		}

		// There was no student modified
		return res.send({ updated: false });
	} catch (error) {
		// There was an error and no student was modified
		return res.send({ updated: false });
	}
};

// Removes a specific user from the database
const removeUser = async (req, res) => {
	// Retrieve the student number from the request body
	const { stdnum } = req.body;

	// Delete the Student with that student number
	// Note: A response is sent for consistency and testability
	try {
		const result = await Student.deleteOne({ stdnum: stdnum });

		// Check if a student was deleted
		if (result.deletedCount > 0) {
			return res.send({ deleted: true });
		}

		// There was no student that was deleted
		return res.send({ deleted: false });
	} catch (error) {
		// There was an error and no student was deleted
		return res.send({ deleted: false });
	}
};

// Removes all users from the database (dangerous)
const removeAllUsers = async (req, res) => {
	// Delete all students from the database
	try {
		const result = await Student.deleteMany({});

		// Check if there was at least one student deleted
		if (result.deletedCount > 0) {
			return res.send({ deleted: true });
		}

		// There was no student that was deleted
		return res.send({ deleted: false });
	} catch (error) {
		// There was an error and no student was deleted
		return res.send({ deleted: false });
	}
};

// Retrieves a user from the database
const getUser = async (req, res) => {
	// Retrieve student number from request query
	const stdnum = req.query.stdnum;

	// Validate stdnum
	if (!stdnum) {
		return res.send([]);
	}

	try {
		// Respond with the resulting Query object from the database read operation
		return res.send(await Student.find({ stdnum: stdnum }));
	} catch (error) {
		// There was an error and the database cannot be read.
		return res.send([]);
	}
};

// Retrives all users from the database
const getMembers = async (req, res) => {
	try {
		// Respond with the resulting Query object from the database read operation
		return res.send(await Student.find({}));
	} catch (error) {
		// There was an error and the database cannot be read.
		return res.send([]);
	}
};

// Export controller functions and student model
export {
	saveStudent,
	updateStudent,
	removeUser,
	removeAllUsers,
	getUser,
	getMembers,
	Student,
};
