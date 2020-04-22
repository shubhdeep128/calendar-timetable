const passport = require("passport");
const express = require("express");
const { google } = require('googleapis')
const googleCalendarService = require('../../google-calendar.service')

require('dotenv/config');


router = express.Router();

router.get("/",(req, res) => {
    
    // check for valid session
    if (req.session.user) {
        console.log(req.session)
        // get oauth2 client
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
            access_token: req.session.user.accessToken
        });

        // get calendar events by passing oauth2 client
        googleCalendarService.listEvents(oauth2Client, (events) => {  
            // console.log(events);
            res.json({event:events}) 
            
        });
        
    } else {
        res.redirect('/auth/google')
    }
});

router.get("/add",async (req,res)=>{
    if (req.session.user) {

        // get oauth2 client
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
            access_token: req.session.user.accessToken,
            apiKey: process.env.GOOGLE_API_KEY
            
        });
        console.log("token")
        
        googleCalendarService.addEvent(oauth2Client, (event) => {  
            // console.log(event);
            res.json({message:"Event added succesfully",event:event}) 
            
        });
        
    } else {
        res.redirect('/auth/google')
    }
});

router.get('/:id',async (req,res)=>{
   

});

router.delete('/:id',async (req,res) => {
   
});


module.exports = router;