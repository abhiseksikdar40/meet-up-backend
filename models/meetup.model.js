const mongoose = require('mongoose')

const meetUpSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: [{ type: String, enum: ['Online', 'Offline'], required: true }],
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    date: { type: Date, required: true },
    tags: [{ type: String }],
    speakers: [String],
    venue: { type: String, required: true },
    address: { type: String, required: true },
    restrictions: { type: String }
  },
   {
    timestamps: true
   } 
)

const MeetUp = mongoose.model("MeetUp", meetUpSchema)

module.exports = MeetUp