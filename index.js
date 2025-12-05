const express = require("express");
const app = express();
const passport = require("passport")
const session = require("express-session");
app.use(express.json());
require('./Auth/google.js')
app.use(session({
    secret:"mysecret",
    resave:false,
    saveUninitialized:true,
}))

app.use(passport.initialize())
app.use(passport.session())

app.get("/",(req,res) => {
    res.send('<a href="/auth/google">login with google</a>')
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));
 
app.get('/auth/google/callbacks', 
  passport.authenticate('google', { failureRedirect: '/login' ,successRedirect:'/profile'}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


  app.get("/profile",(req,res) => {
        if(!req.user) return res.redirect("/");

        res.send(`
                <h1>welcome ${req.user.name}</h1>
                <img src="${req.user.picture}" width="100"/>
                <a href="/logout">logout</a>
            `)
  });


  app.get("/logout",(req,res) => {
        req.logout(() =>{
            res.redirect("/");
        })
  })
app.listen(3000,() => {
    console.log("running");
    
})
