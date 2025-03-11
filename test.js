import needle from "needle";
import mongoose from "mongoose";
import { Student } from "./controller.js";
import { open } from "node:fs/promises";

// Web server endpoints
const saveStudentEndpoint = "/save-student";
const updateStudentEndpoint = "/update";
const removeUserEndpoint = "/remove-user";
const removeAllUsersEndpoint = "/remove-all-user";
const getUserEndpoint = "/user";

// Web server URL
const PORT = 3000;
const URL = `http://localhost:${PORT}`;

// Tests ------------------------------------------------------------------------------------------------------------------------------

await resetTests(); // Reset the database to its original state

// * IMPORTANT: Comment/uncomment specific lines that correspond to different tests

// await saveStudentTests(); // Test save functionality
// await updateStudentTests(); // Test update functionality
// await getUserTests(); // Get user functionality
// await removeUserTests(); // Remove functionality
// await removeAllUsersTests(); // Remove all functionality

// Reset ------------------------------------------------------------------------------------------------------------------------------

async function resetTests() {
	// Remove all entries from the database
	await Student.deleteMany({});

	// Load the whole database
	const file = await open("./studentData.txt");
	for await (const line of file.readLines()) {
		// Parse each line and attempt to update an existing entry in the database
		// If it does not exist, create that object (upsert)
		// This basically loads all data from the file
		const studentEntry = JSON.parse(line);
		await Student.updateOne({ stdnum: studentEntry.stdnum }, studentEntry, {
			upsert: true,
		});
	}

	// Disconnect from Mongoose (since importing controller.js connects us to the server)
	mongoose.disconnect();
}

// Grouped test runners below ----------------------------------------------------------------------------------------------------------

async function saveStudentTests() {
	console.log("SAVE STUDENTS ---");

	// List of test functions
	const tests = [
		saveStudentToDatabase,
		noDuplicateStudents,
		noMissingInfoForSave,
	];

	// List of expected responses from the server
	const expected = [
		{ inserted: true },
		{ inserted: false },
		{ inserted: false },
	];

	// Check if the result matches the expected result
	let i = 0;
	for (const test of tests) {
		const result = await test();

		console.log(
			`TEST ${i + 1} (${test.name}): ${
				JSON.stringify(result) === JSON.stringify(expected[i])
					? "PASSED"
					: "FAILED"
			}`,
		);
		i++;
	}
}

async function updateStudentTests() {
	console.log("UPDATE STUDENT ---");

	// List of test functions
	const tests = [updateClintSalmon, noMissingFirstNameForUpdate];

	// List of expected responses from the server
	const expected = [{ updated: true }, { updated: false }];

	// Check if the result matches the expected result
	let i = 0;
	for (const test of tests) {
		const result = await test();

		console.log(
			`TEST ${i + 1} (${test.name}): ${
				JSON.stringify(result) === JSON.stringify(expected[i])
					? "PASSED"
					: "FAILED"
			}`,
		);
		i++;
	}
}

async function getUserTests() {
	console.log("GET USER---");

	// List of test functions
	const tests = [getClintSalmon, userMustExistForGetUser];

	// List of expected lengths of the responses from the server
	const expected = [1, 0];

	// Check if the result matches the expected result
	let i = 0;
	for (const test of tests) {
		const result = await test();

		console.log(
			`TEST ${i + 1} (${test.name}): ${
				result.length === expected[i] ? "PASSED" : "FAILED"
			}`,
		);

		i++;
	}
}

async function removeUserTests() {
	console.log("DELETE USER ---");

	// List of test functions
	const tests = [removeFancyGodfroy, studentMustExistForRemove];

	// List of expected responses from the server
	const expected = [{ deleted: true }, { deleted: false }];

	// Check if the result matches the expected result
	let i = 0;
	for (const test of tests) {
		const result = await test();

		console.log(
			`TEST ${i + 1} (${test.name}): ${
				JSON.stringify(result) === JSON.stringify(expected[i])
					? "PASSED"
					: "FAILED"
			}`,
		);
		i++;
	}
}

async function removeAllUsersTests() {
	console.log("DELETE ALL USERS ---");

	// List of test functions
	const tests = [removeAllStudents, dataMustExistForRemoveAll];

	// List of expected responses from the server
	const expected = [{ deleted: true }, { deleted: false }];

	// Check if the result matches the expected result
	let i = 0;
	for (const test of tests) {
		const result = await test();

		console.log(
			`TEST ${i + 1} (${test.name}): ${
				JSON.stringify(result) === JSON.stringify(expected[i])
					? "PASSED"
					: "FAILED"
			}`,
		);
		i++;
	}
}

// Individual tests below --------------------------------------------------------------------------------------------------------------

async function saveStudentToDatabase() {
	return new Promise((resolve, reject) =>
		// Save a dummy student to the database
		needle.post(
			`${URL}${saveStudentEndpoint}`,
			{
				stdnum: "1970-00001",
				fname: "Dee",
				lname: "Bug",
				age: 1,
			},
			(err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res.body);
				}
			},
		),
	);
}

async function noDuplicateStudents() {
	// Saving a duplicate student should not be allowed
	return await saveStudentToDatabase();
}

async function noMissingInfoForSave() {
	// Saving a student with missing required info is not allowed
	return new Promise((resolve, reject) =>
		needle.post(
			`${URL}${saveStudentEndpoint}`,
			{
				// stdnum is missing
				fname: "Dee",
				lname: "Bug",
				age: 1,
			},
			(err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res.body);
				}
			},
		),
	);
}

async function updateClintSalmon() {
	// Update Clint Salmon to Peter Parker
	return new Promise((resolve, reject) =>
		needle.post(
			`${URL}${updateStudentEndpoint}`,
			{
				fname: "Peter",
			},
			(err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res.body);
				}
			},
		),
	);
}

async function noMissingFirstNameForUpdate() {
	// The first name is required and cannot be null
	return new Promise((resolve, reject) =>
		needle.post(
			`${URL}${updateStudentEndpoint}`,
			{
				fname: null,
			},
			(err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res.body);
				}
			},
		),
	);
}

async function getClintSalmon() {
	return new Promise((resolve, reject) =>
		needle.get(`${URL}${getUserEndpoint}?stdnum=5615273380`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.body);
			}
		}),
	);
}

async function userMustExistForGetUser() {
	return new Promise((resolve, reject) =>
		needle.get(`${URL}${getUserEndpoint}?stdnum=0000000000`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.body);
			}
		}),
	);
}

async function getMembers() {
	return new Promise((resolve, reject) =>
		needle.post(`${URL}${getMembers}`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.body);
			}
		}),
	);
}

async function removeFancyGodfroy() {
	return new Promise((resolve, reject) =>
		needle.post(
			`${URL}${removeUserEndpoint}`,
			{
				stdnum: "6568118303",
			},
			(err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res.body);
				}
			},
		),
	);
}

async function studentMustExistForRemove() {
	return new Promise((resolve, reject) =>
		needle.post(
			`${URL}${removeUserEndpoint}`,
			{
				stdnum: "nil",
			},
			(err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res.body);
				}
			},
		),
	);
}

async function removeAllStudents() {
	return new Promise((resolve, reject) =>
		needle.post(`${URL}${removeAllUsersEndpoint}`, {}, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.body);
			}
		}),
	);
}

async function dataMustExistForRemoveAll() {
	return await removeAllStudents();
}
