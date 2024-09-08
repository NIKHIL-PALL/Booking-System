
const Availability = require('../model/Availability');

const getSlotsByUserId = async(req, res) => {
    const {userId}  = req.params;
    try{
        const slots = await Availability.find({userId});
        if(!slots) {
            return res.status(404).json({message : "No slots are available"});
        }
        else{
            return res.status(200).json(slots);
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({message : error.message});
    }
}

const createSlot = async(req, res) => {
    const {userId} = res.locals;
    const {day, slots} = req.body;
    
    try{

        const existingSlots = await Availability.findOne({userId, day});
        if(!existingSlots) {
            const newAvailability = new Availability({userId, day, slots});
            await newAvailability.save();
        }
        else{
            existingSlots.slots.push(...slots);
            await existingSlots.save();
        }
        return res.status(201).json({message : "Succesfully created slot"});
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server error"});
    }

}

const updateSlotTime = async (req, res) => {
    const {userId} = res.locals;
    const {index, newStart, newEnd} = req.body;
    try{
        const availability = await Availability.findOne({userId});
        if(!availability) {
            return res.status(404).json({message : "Invalid userId"});
        }
        else{
            availability.slots[index].start = newStart;
            availability.slots[index].end = newEnd;
            await availability.save();
        }
        return res.status(200).json({message : "Successfully updated"});
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({message : error.message});
    }
}

const deleteSlotByIndex = async(req, res) => {
    const {userId} = res.locals;
    const {index} = req.params;

    try{
        const slotIndex = parseInt(index);
        
        const availableSlots = await Availability.findOne({userId});
        if(slotIndex < 0 || slotIndex >= availableSlots.slots.length) {
            return res.status(409).json({message : "Invalid Slot Index"});
        }
        if(!availableSlots) {
            return res.status(404).json({message : "Slot not found"});
        }
        else{
            availableSlots.slots = availableSlots.slots.filter((slot, ind) => ind !== slotIndex);
            await availableSlots.save();
            console.log(availableSlots.slots)
        }
        return res.status(200).json({message : "Succesfully deleted slot."});
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({message : error.message});
    }

}
const mongoose = require("mongoose");

const deleteSlotById = async (req, res) => {
  const { userId } = res.locals;
  const { slotId } = req.params; // Get slotId from params

  try {
    // Convert the slotId to a MongoDB ObjectId
    const objectIdSlotId = mongoose.Types.ObjectId(slotId);

    // Find the availability document for the user
    const availableSlots = await Availability.findOne({ userId });

    if (!availableSlots) {
      return res.status(404).json({ message: "Availability not found" });
    }

    // Find the slot by its ObjectId
    const slotIndex = availableSlots.slots.findIndex(
      (slot) => slot._id.equals(objectIdSlotId) // Use equals() method for ObjectId comparison
    );

    if (slotIndex === -1) {
      return res.status(409).json({ message: "Slot not found" });
    }

    // Remove the slot from the slots array
    availableSlots.slots.splice(slotIndex, 1);
    await availableSlots.save();

    return res.status(200).json({ message: "Successfully deleted slot." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

  


module.exports = {
    createSlot,
    updateSlotTime,
    getSlotsByUserId,
    deleteSlotByIndex,
    deleteSlotById
}
