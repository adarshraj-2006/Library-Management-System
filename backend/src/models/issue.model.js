import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
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

export default mongoose.model("Issue", issueSchema);