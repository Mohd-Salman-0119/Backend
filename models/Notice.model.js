const { mongoose } = require("../imports/modules.imports")

const noticeSchema = {
     title: { type: String, required: true },
     body: { type: String, required: true },
     category: { type: String, required: true, enum: ["parking", "covid", "maintenance"] },
     date: { type: String, required: true },
     user_email: { type: String, required: true },
}

const NoticeModel = mongoose.model("notice", noticeSchema);

module.exports = { NoticeModel }