import Issue from "../models/issue.model.js";

export const createIssue = async (req, res) => {
    try {
        const {memberId, bookId} = req.body;
        const newIssue = await Issue.create({
            memberId,
            bookId,
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        })
        await newIssue.save();
        
        // Populate the book information before sending to frontend since Borrowpage might use it, though frontend only uses dueDate right now
        res.status(200).json({ success: true, data: newIssue });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const returnBook = async (req, res) => {
    try {
        const {issueId}=req.body;
        const issue=await Issue.findById(issueId);
        if(!issue) return res.status(404).json({ success: false, message: "Issue not found" });
        issue.returnDate=new Date();
        issue.status="returned";
        await issue.save();
        res.status(200).json({ success: true, issue });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
