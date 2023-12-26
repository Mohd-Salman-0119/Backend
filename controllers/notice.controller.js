const { express } = require("../imports/modules.imports")
const { NoticeModel, UserModel } = require("../imports/models.imports")

const noticeRouter = express.Router();


noticeRouter.get("/", async (req, res) => {
     const { category } = req.query;
     let notice = await NoticeModel.find();

     if (category) {
          notice = notice.filter(item => item.category.toLowerCase().includes(category.toLowerCase()))
     }
     try {
          res.send({ notice })
     } catch (error) {
          res.send({ msg: "Something went wrong, Plz try again leter" })
     }
})


noticeRouter.post("/", async (req, res) => {
     const { title, body, category, date } = req.body;
     const userId = req.userId;
     const user = await UserModel.findOne({ _id:userId })

     if (!user) {
          res.send({ msg: "Invalid Cradinetial" });
     }

     console.log(userId)
     const user_email = user.email
     try {
          await NoticeModel.create({ title, body, category, date, user_email })
          res.send({ msg: "Notice added successfully" })
     } catch (error) {
          res.send({ msg: "Something went wrong, Plz try again leter" })
     }
})

noticeRouter.put("/:ID", async (req, res) => {
     const ID = req.params.ID;
     const payload = req.body
     try {
          await NoticeModel.findByIdAndUpdate(ID, payload)
          res.send({ msg: "Notice updated successfully" })
     } catch (error) {
          res.send({ msg: "Something went wrong, Plz try again leter" })
     }
})
noticeRouter.delete("/:ID", async (req, res) => {
     const ID = req.params.ID;

     try {
          await NoticeModel.findByIdAndDelete(ID)
          res.send({ msg: "Notice deleted successfully" })
     } catch (error) {
          res.send({ msg: "Something went wrong, Plz try again leter" })
     }
})
module.exports = { noticeRouter }