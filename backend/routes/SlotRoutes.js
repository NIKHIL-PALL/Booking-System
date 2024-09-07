

const express = require('express');
const SlotController  = require('../controller/SlotController');
const router = express.Router();


router.get('/:userId', SlotController.getSlotsByUserId);
router.post('/createSlot', SlotController.createSlot);
router.patch('/updateSlotTime', SlotController.updateSlotTime);
router.delete('/:userId/:index', SlotController.deleteSlotByIndex);

module.exports = router;