const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")

const app = express()

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute);

// app.get("/", (req, res)=>{
//   res.send("welcome to homepage")
// })

// app.get("/users", (req, res)=>{
//   res.send("welcome to users page")
// })

app.listen(8800, ()=>{
    console.log("Backend server is running!!!")
})

dotenv.config();
const dbUrl = process.env.MONGO_URL;

// Make sure the connection URL is available
if (!dbUrl) {
  console.error('MongoDB connection URL not found in .env file.');
  process.exit(1);
}

// MongoDB connection options (if needed)
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB using promises
mongoose
  .connect(dbUrl, dbOptions)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });


