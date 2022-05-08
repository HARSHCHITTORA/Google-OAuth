const router=require('express').Router()
const passport=require('passport')

//auth login
router.get("/login",(req,res)=>{
  res.render('login',{user:req.user})
})

//auth logout
router.get("/logout",(req,res)=>{
    // res.send("logging out")
    req.logout()
    res.redirect('/')
})

//auth with google

router.get("/google",passport.authenticate('google',{
    //scope property is bassically telling passport when we want to retreive from user profiel
    scope:['profile']
}))

//callback route to google to redirect
//hand control to passport to use code to grab profile info
router.get("/google/redirect",passport.authenticate('google'),(req,res)=>{
  res.redirect("/profile")
  // res.send(req.user.username)

})

module.exports=router