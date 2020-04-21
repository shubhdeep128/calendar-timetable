const passport = require("passport");
const express = require("express");
const app = express();
const User = require('../../models/User')
module.exports = app => {
  app.get("/auth/test", (req, res) => {
    res.send("Auth Working properly");
  });
  app.get(
    "/auth/google",
    passport.authenticate("google-auth", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/calendar.events"
      ]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google-auth"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
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
