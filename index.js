import express from "express";
import router from "./router.js";

const PORT = 3000;

// Create express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up routes using router
router(app);

// Express server
try {
	app.listen(PORT);
	console.log(`Listening at port ${3000}.`);
} catch (error) {
	console.log(error);
}
