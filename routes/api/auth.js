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
    passport.authenticate("google", {
      scope: [
        'https://www.googleapis.com/auth/calendar.events',
        'profile',
        'email',
        'https://www.googleapis.com/auth/calendar'
      ]
    })
  );
  
  app.get(
     "/auth/google/callback",
     passport.authenticate("google"),
     (req, res) => {
      //  console.log(req.session)
       res.redirect("/");
     }
  ) ;

  app.get("/api/logout", (req, res) => {
    
      req.session = null;
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
      res.send({user:{status: "Unauthorized"},loggedIn:false})
    }
  });
}
