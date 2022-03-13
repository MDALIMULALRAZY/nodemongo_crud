const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

dotenv.config();

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify:true
   },
  () => console.log("connected to db")
);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

// Import routes
const authRoute = require("./routes/auth");
//const portsRoute = require("./routes/ports");
const userRoute = require("./routes/users");
 const postRoute = require("./routes/posts");
 const categoryRoute = require("./routes/categories");
// Middlewares
app.use(express.json());
app.use(cors());

// route Middlewares
 app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
 app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(4000, () => console.log("server up and runing on port 4000!"));