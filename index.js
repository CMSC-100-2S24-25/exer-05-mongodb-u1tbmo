import express from "express";
import router from "./router.js"

const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up routes using router
router(app);

// Express server
try {
	app.listen(PORT);
	console.log("Connected to server!");
} catch (error) {
	console.log(error);
}
