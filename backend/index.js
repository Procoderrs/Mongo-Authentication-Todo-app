const express = require("express");
const UserRoute = require("./routes/auth");
const TodoRoute = require("./routes/todo");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectToDB = require("./utils/conect");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

dotenv.config();

const corsOptions = {
	origin: [
		"http://localhost:5173", // Local development URL
		
		//"https://mongo-todo-authentication.netlify.app",
		"https://mongo-authentication-todo-app-o9wo.vercel.app",
		"https://mongo-todo-authentication.netlify.app"
	],
	credentials:true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser());
app.use("/api/user", UserRoute);
app.use("/api/todos", TodoRoute);


// index.js
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// verifyToken


connectToDB();

app.get("/", (req, res, next) => {
	res.send("heelllo world");
});

//global errro handler
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "internal server error";
	res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
