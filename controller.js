import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.127017/StudentDatabase";

try {
	connect(MONGODB_URI);
} catch (error) {
	console.log(error);
}

const Student = mongoose.model("Student", {
	stdnum: String,
	fname: String,
	lname: String,
	age: Number,
});

function saveStudent() {}
function updateStudentFirstName() {}
function removeUser() {}
function removeAllUsers() {}
function getUser() {}
function getMembers() {}

export {
	saveStudent,
	updateStudentFirstName,
	removeUser,
	removeAllUsers,
	getUser,
	getMembers,
};
