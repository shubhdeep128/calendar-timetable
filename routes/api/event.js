const passport = require("passport");
const express = require("express");
const { google } = require('googleapis')
const googleCalendarService = require('../../utils/google-calendar.service')

require('dotenv/config');


router = express.Router();

router.get("/",(req, res) => {
    
    if (req.isAuthenticated()) {
        
        console.log(req.session)
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
            access_token: req.session.accessToken
        });

        googleCalendarService.listEvents(oauth2Client, (events) => {  
            res.json({event:events}) 
        });
    } else {
        res.json({status:"Unauthorized"})
    }
});

router.get("/add",async (req,res)=>{
    if (req.isAuthenticated()) {

        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
            access_token: req.session.accessToken,
            apiKey: process.env.GOOGLE_API_KEY
            
        });
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
            end: {
              dateTime: eventEndTime,
              timeZone: 'Asia/Kolkata'
            },
            colorId: 1,
          }
        // event = req.body
        googleCalendarService.addEvent(oauth2Client,event, (newEvent) => {  
            res.json({message:"Event added succesfully",event:newEvent}) 
        });
        
    } else {
        res.json({status:"Unauthorized"})
    }
});

router.get('/:id',async (req,res)=>{
    if (req.isAuthenticated()) {

        console.log(req.session)
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
            access_token: req.session.accessToken
        });
        googleCalendarService.getEvent(oauth2Client, req.params.id, (event) => {  
            res.json({resource:event}) 
        });
        
    } else {
        res.json({status:"Unauthorized"})
    }
})

router.patch('/:id',async(req,res)=>{
    if (req.isAuthenticated()) {

        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
            access_token: req.session.accessToken,
            apiKey: process.env.GOOGLE_API_KEY
            
        });
        const event = {
            description: 'This event is now updated',
          }
        // event = req.body
        googleCalendarService.editEvent(oauth2Client,event,req.params.id,(newEvent) => {  
            res.json({message:"Event Updated succesfully",event:newEvent}) 
        });
        
    } else {
        res.json({status:"Unauthorized"})
    }
})

router.delete('/:id',async (req,res) => {
    if(req.isAuthenticated()){
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
            access_token: req.session.accessToken,
            apiKey: process.env.GOOGLE_API_KEY
            
        });
        googleCalendarService.deleteEvent(oauth2Client,req.params.id, (eventId) => {  
            res.json({message:"Event deleted succesfully",eventId:eventId}) 
        });
    }
    else{
        res.json({status:"Unauthorized"})
    }
});


module.exports = router