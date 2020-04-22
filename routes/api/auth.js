const passport = require("passport");
const express = require("express");
const app = express();
const { google } = require('googleapis');

const User = require('../../models/User')
const googleUtil = require('../../google-util')
const googleCalendarService = require('../../google-calendar.service')

module.exports = app => {
  app.get("/auth/test", (req, res) => {
    res.send("Auth Working properly");
  });
  app.get(
    "/auth/google",(req,res)=>{
      res.redirect(googleUtil.urlGoogle());
    }
  );
  const setCookie = async (req, res, next) => {
    googleUtil.getGoogleAccountFromCode(req.query.code, (err, res) => {
        if (err) {
            res.redirect('/login');
        } else {
            req.session.user = res;
        }
        next();
    });
}
  app.get(
    "/auth/google/callback",
    setCookie, (req, res) => {
      res.redirect('/');
  }
  );

  app.get("/api/logout", (req, res) => {
    
    req.session.destroy(err=>{
      if(err){
        res.redirect('/api');
      }
      res.clearCookie('sid');
      req.logout();
      res.redirect("/");
    })

  });

  app.get('/home', (req, res) => {
    
    // check for valid session
    if (req.session.user) {

        // get oauth2 client
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
            access_token: req.session.user.accessToken
        });

        // get calendar events by passing oauth2 client
        googleCalendarService.listEvents(oauth2Client, (events) => {  
            console.log(events);
            res.json({event:events}) 
            
        });
        
    } else {
        res.redirect('/auth/google')
    }
});
  app.get("/api/user/:id",async (req,res)=>{
    try {
      const user = await User.findById(req.params.id);
      res.json({user:user});
      console.log(user);
    } catch (error) {
      res.json({message: error})
      console.log(error);
    }
  })

  app.get("/api/current_user", (req, res) => {
    if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
      res.send({user:req.user,loggedIn:true});
    }
    else{
      res.send({user:{Roles: "Unauthorized"},loggedIn:false})
    }
  });
};
