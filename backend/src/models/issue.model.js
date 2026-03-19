import monggose from "mongoose";

const userSchema= new mongoose.Schema({
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    },
    memberId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    issueDate:{
        type:Date,
        default:Date.now
    },
    dueDate:{
        type:Date,
        required:true
    },
    returnDate:{
        type:Date
    },
    status:{
        type:String,
        enum:["issued","returned","overdue"],
        default:"issued"
    }
})