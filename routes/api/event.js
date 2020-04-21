var Event = require('../../models/Event')
const passport = require("passport");
const express = require("express");
const { google } = require('googleapis')
require('dotenv/config');


router = express.Router();

router.get("/",passport.authenticate("google-auth",{failureRedirect:"/fail",scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events"
  ]}),async (req,res)=>{
    console.log(process.env.GOOGLE_API_KEY)

    const calendar = google.calendar({ version: 'v3',auth: process.env.GOOGLE_API_KEY})


    const eventStartTime = new Date();
    eventStartTime.setDate(eventStartTime.getDay())
    eventStartTime.setMinutes(eventStartTime.getMinutes() + 30)
    const eventEndTime = new Date()
    eventEndTime.setDate(eventEndTime.getDay())
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 90)

    const event = {
    summary: 'Test Event',
    location: 'Home',
    description: 'This is an event to test universical api',
    colorId: 1,
    start: {
        dateTime: eventStartTime,
        timeZone: 'Asia/Kolkata'
    },
    end:{
        dateTime: eventEndTime,
        timeZone: 'Asia/Kolkata'
    },
    colorId: 1, 
    }

    calendar.freebusy.query(
        {
            resource: {
                timeMin: eventStartTime,
                timeMax: eventEndTime,
                timeZone: 'Asia/Kolkata',
                items: [{ id: 'primary' }],
            },
        },
        (err,res) => {
            if(err) return console.error('Free Busy Query Error: ',err)
            
            const eventsArr = res.data.calendars.primary.busy

            if(eventsArr.length === 0) return calendar.events.insert(
                { calendarId: 'primary', resource: event },
                 (err) => {
                     if(err) return console.error('Calendar Event Creation Error: ',err)

                     return console.log('Calendar Event Created')
                 })
                 return console.log(`Sorry I'm Busy`)
        }
    )

    res.json({message:"events", event: event})

});

router.post("/add",async (req,res)=>{
});

router.get('/:id',async (req,res)=>{
   

});

router.delete('/:id',async (req,res) => {
   
});


module.exports = router;