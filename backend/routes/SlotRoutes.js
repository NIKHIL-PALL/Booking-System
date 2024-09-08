

const express = require('express');
const SlotController  = require('../controller/SlotController');
const authenticateToken = require('../services/authentication');
const allowAdminOrOwnUser = require('../services/allowAdminOrOwnUser');
const router = express.Router();


router.get('/:userId', authenticateToken, allowAdminOrOwnUser, SlotController.getSlotsByUserId);
router.post('/createSlot', authenticateToken, SlotController.createSlot);
router.patch('/updateSlotTime', authenticateToken, SlotController.updateSlotTime);
router.delete('/:index', authenticateToken, SlotController.deleteSlotByIndex);

module.exports = router;