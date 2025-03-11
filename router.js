import {
	saveStudent,
	updateStudentFirstName,
	removeUser,
	removeAllUsers,
	getUser,
	getMembers,
} from "./controller.js";

// Create post and get endpoints for the express app
const router = (app) => {
  app.post("/save-student", saveStudent);
	app.post("/update", updateStudentFirstName);
	app.post("/remove-user", removeUser);
	app.post("/remove-all-user", removeAllUsers);
	app.get("/user", getUser);
	app.get("/members", getMembers);
};

export default router;
