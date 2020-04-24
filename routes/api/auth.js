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
    googleUtil.getGoogleAccountFromCode(req.query.code, (err, profile) => {
        if (err) {
            res.redirect('/login');
        } else {
            req.session.user = profile;
            User.findOne({ email: profile.email }).then(existingUser => {
              if (existingUser) {
                console.log("existing user")
              } else {
                new User({
                  googleId: profile.id,
                  name: profile.name,
                  email: profile.email,
                  photo: profile.photo
                })
                  .save()
                  .then(()=>{console.log("New User Created")});
              }
            });
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
      res.send({user:{status: "Unauthorized"},loggedIn:false})
    }
  });
};
