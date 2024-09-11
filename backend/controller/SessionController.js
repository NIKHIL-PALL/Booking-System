const Session = require("../model/Session");
const getAllSessions = async (req, res) => {
  try {
    const allSessions = await Session.find().populate("participants");
    if (!allSessions) {
      return res.status(404).json({ message: "No session is available" });
    } else {
      return res.status(200).json(allSessions);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSessionById = async(req, res) => {
    const {sessionId} = req.params;

    try{
        const session = await Session.findById(sessionId);
        if(!session) {
            return res.status(404).json({message : "Session not found."});
        }
        else{
            return res.status(200).json(session);
        }
    }
    catch(error) {
        return res.status(500).json({message : error.message});
    }
}

const getAllSessionsByUserId = async (req, res) => {
  const { userId } = req.params;

  const sessions = await Session.find({ participants: userId }).populate(
    "participants"
  );

  if (!sessions) {
    return res.status(404).json({ message: "Sessions not found" });
  } else {
    return res.status(200).json(sessions);
  }
};

const createSession = async (req, res) => {
  const { sessionType, userId, start, end, day } = req.body;

  try {
    const session = new Session({
      sessionType,
      participants: [userId],
      start,
      end,
      day
    });
    session.save();
    return res.status(201).json({ message: "Succesfully created session" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const addUsersToSession = async (req, res) => {
  const { sessionId, userId } = req.body;
  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session does not found." });
    } else {
      session.participants.push(userId);
      session.save();
    }
    return res
      .status(200)
      .json({ message: "Succesfully added user to session." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await Session.findByIdAndDelete(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session does not exist" });
    } else {
      return res.status(200).json({ message: "Successfully deleted session." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllSessions,
  createSession,
  addUsersToSession,
  deleteSession,
  getAllSessionsByUserId,
  getSessionById
};
