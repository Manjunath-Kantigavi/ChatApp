import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import Conversation from "../models/conversation.model.js";

const router = express.Router();

router.get("/", protectRoute, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: { $in: [req.user._id] },
    }).sort({ updatedAt: -1 });

    res.status(200).json(conversations.map(c => ({
      participants: c.participants.map(p => p.toString()),
      updatedAt: c.updatedAt,
    })));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;