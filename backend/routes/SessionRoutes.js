const SessionController = require("../controller/SessionController");
const allowAdminOrOwnUser = require("../services/allowAdminOrOwnUser");
const allowOnlyAdmin = require("../services/allowOnlyAdmin");
const authenticateToken = require("../services/authentication");
const express = require("express");

const router = express.Router();

router.get("/", authenticateToken, allowOnlyAdmin, SessionController.getAllSessions);
router.get(
  "/:userId",
  authenticateToken,
  allowAdminOrOwnUser,
  SessionController.getAllSessionsByUserId
);
router.get(
  "/:sessionId",
  authenticateToken,
  allowOnlyAdmin,
  SessionController.getSessionById
);
router.post("/", authenticateToken, allowOnlyAdmin, SessionController.createSession);
router.post(
  "/addUser",
  authenticateToken,
  allowOnlyAdmin,
  SessionController.addUsersToSession
);
router.delete(
  "/:sessionId",
  authenticateToken,
  allowOnlyAdmin,
  SessionController.deleteSession
);

module.exports = router;
