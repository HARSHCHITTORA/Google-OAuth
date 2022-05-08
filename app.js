const express=require("express")
const authRoutes=require('./ROUTES/auth')
const profileRoutes=require('./ROUTES/profile')
const passportSetup=require("./config/passport")
const mongoose=require("mongoose")
const keys=require("./config/keys")
const { connect } = require("./ROUTES/auth")
const cookieSession=require('cookie-session')
const passport=require('passport')
const app=express()


app.use(express.static('public'))

// app.use('/css',express.static(__dirname+'public/css'))
app.use(express.static(__dirname + '/public'));

app.use(cookieSession({
    maxAge:24*60*60*1000,//values of day should be in millisecond  24 for 24 hours in a times 60 minutes in hour * 60 second in minutes*1000 for millisecond in seconds
    keys:[keys.session.cookieKey]

}))

//inintialize passport 

app.use(passport.initialize())
app.use(passport.session())


// connect to mongodb

mongoose.connect(keys.mongodb.dbURI,()=>{
    console.log('connected to mongodb')
})


//set up view engine
 
app.set("view engine",'ejs')

//set up routes
app.use('/auth',authRoutes)
app.use('/profile',profileRoutes)

//create home route
app.get("/",(req,res)=>{
 res.render("home",{user:req.user})
})

app.listen(5000,()=>{
    console.log("app now listening on port 5000")
})