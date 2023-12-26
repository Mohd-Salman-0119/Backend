require("dotenv").config();
// imports

const { express, cors, bcrypt, jwt } = require("./imports/modules.imports")
const { connectionDB } = require("./imports/config.imports")
const { UserModel } = require("./imports/models.imports")
const { auth } = require("./imports/middleware.imports")
const { noticeRouter } = require("./imports/controller.imports")

const app = express();

app.use(express.json())
app.use(cors({
     origin: "*"
}))


app.get("/ping", (req, res) => {
     res.send({ msg: "pong" })
})

app.post("/signup", async (req, res) => {
     const { name, email, password, phone_number, department } = req.body;

     try {
          bcrypt.hash(password, 5, async function (err, hash) {
               if (hash) {

                    await UserModel.create({ name, email, password: hash, phone_number, department });
                    res.send({ msg: "Sign up Successfull" })
               } else {
                    res.send({ msg: "Cannot get hash" })
               }
          });

     } catch (error) {
          res.send({ msg: "Something wend wrong. Plz try again leter" })
     }
})

app.post("/login", async (req, res) => {
     
     const { email, password } = req.body;
     const user = await UserModel.findOne({ email })
     if (!user) {
          res.send({ msg: "Invalid Cradintials!" })
     }
     const hash = user.password
     const userId = user._id
     let jwtToken;
     try {
          jwt.sign({ userId: userId }, process.env.PRIVATE_KEY, function (err, token) {
               jwtToken = token
          });
          bcrypt.compare(password, hash, function (err, result) {
               if (result) {
                    res.send({ msg: "Login Successfull", token: jwtToken })
               } else {
                    res.send({ msg: "Login Unsuccessfull" })
               }
          });
     } catch (error) {
          res.send({ msg: "something went wrong. plz try again" })
     }
})

app.use(auth)
app.use("/notice", noticeRouter)

const PORT = process.env.PORT;
connectionDB().then(() => {
     app.listen(PORT, () => {
          console.log("Server is runing on PORT", PORT)
     })
})









