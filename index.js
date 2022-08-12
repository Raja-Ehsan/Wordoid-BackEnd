const connection = require("./model/index");
const express = require("express");
const app = express();
const BlogController = require('./controllers/blogs')
const UserController = require('./controllers/users')
const path = require("path");
const cors = require('cors');
const handleNewUser = require('./controllers/registerController')
const handleLogin = require('./controllers/loginController')
const bodyparser = require("body-parser");
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload=multer({storage});

app.use(bodyparser.urlencoded({
    extended: true
}))

app.use('/images', express.static(path.join(__dirname, 'public/images')))

app.use(bodyparser.json())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials : true
}))

app.use("/blog", BlogController)
app.use("/user", UserController)

app.get("/", (req, res) => {
    res.send("Hello")
})

app.post('/uploadImage', upload.single('file'), async (req, res) => {
    try { console.log("uploaded") } catch (err) { console.log(err) }
});

app.post('/signup', handleNewUser);

app.post('/login', handleLogin);

app.listen(3003, () => {
    console.log("Server started at 3003")
})