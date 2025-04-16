const { initializeMeetUpData } = require('./db/db.connect')
initializeMeetUpData()

const MeetUpApp = require('./models/meetup.model')
const express = require('express')
const cors = require('cors')
const app = express()

const corsOptions = {
    origin: "*",
    Credentials: true
}

app.use(express.json())
app.use(cors(corsOptions))

const PORT = 2020
app.listen(PORT, () => {
    console.log(`Port is running on ${PORT}`)
})


// Create New Event

async function createEvent(newEvent) {
    try {
        const event = new MeetUpApp(newEvent)
        await event.save()
        return event
    } catch (error) {
        console.log("Error creating Event Details!", error)
    }
}

app.post("/events", async (req, res) => {
    try {
        const createdEvent = await createEvent(req.body)
        res.status(201).json({message: "Event Created Successfully.", showEvent: createdEvent})
    } catch (error) {
        res.status(500).json({error: "Failed To Create Event Details!"})
    }
})


// Get All Events

async function getAllEvents() {
    try {
        const allEvent = await MeetUpApp.find()
        return allEvent
    } catch (error) {
        console.log("Error occured while getting all events.");  
    }
}

app.get("/events", async (req, res) => {
    try {
        const getEvents = await getAllEvents()
        if(getEvents.length != 0) {
            res.json(getEvents)
        } else {
            res.status(404).json({error: "Event Not Found!"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed To Get All Events!"})
    }
})

// Get Events By Id

async function getEventById(eventId) {
    try {
      const event = await MeetUpApp.findById(eventId);
      return event;
    } catch (error) {
      console.log("Error occurred while getting event by ID.", error);
    }
  }

  app.get("/events/:eventId", async (req, res) => {
    try {
      const eventById = await getEventById(req.params.eventId);
      if (eventById) {
        res.status(200).json(eventById);
      } else {
        res.status(404).json({ error: "Event Not Found!" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed To Get Event By ID!" });
    }
  });  
  

// Find Events By Id And Update Details

async function updateEventDetails(eventId, dataToUpdate) {
    try {
        const findByIdAndUpdateEvent = await MeetUpApp.findByIdAndUpdate(eventId, dataToUpdate, {new: true})
        return findByIdAndUpdateEvent
    } catch (error) {
        console.log("Error occured while updating event details.");  
    }
}

app.post("/events/update/:eventId", async (req, res) => {
    try {
        const updatedEventDetails = await updateEventDetails(req.params.eventId, req.body)
        if(updatedEventDetails) {
            res.status(200).json({message: "Event Data Updated Successfully.", displayEvent: updatedEventDetails})
        } else {
            res.status(404).json({error: "Event Not Found!"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed To Update Event Data!"})
    }
})

// Delete Event By Event Id

async function deleteEventDetails(eventId) {
    try {
        const findAndDeleteEvent = await MeetUpApp.findByIdAndDelete(eventId)
        return findAndDeleteEvent
    } catch (error) {
        console.log("Error occured while deleting event details.");  
    }
}

app.delete("/events/delete/:eventId", async (req, res) => {
    try {
        const deletedEventDetails = await deleteEventDetails(req.params.eventId)
        if(deletedEventDetails) {
            res.status(200).json({message: "Events Data Deleted Successfully."})
        } else {
            res.status(404).json({error: "Event Not Found!"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed To Delete Events Details!"})
    }
})