const passport=require('passport')
const googleStrategy=require("passport-google-oauth").OAuth2Strategy
const keys=require('./keys')
const User=require('../modals/modals')


passport.serializeUser((user,done)=>{
   done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{

        done(null,user)
    })
})
passport.use(
    new googleStrategy({
    //option for the google strategy
    callbackURL:"/auth/google/redirect",
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret 
},(acessToken,requestToken,profile,done)=>{
    //passport callback function 
    // console.log("passport callback function fire")
    // console.log(profile)
    console.log(profile)

//check if user already present in database
    User.findOne({googleId:profile.id}).then((currentUser)=>{

        if(currentUser){
            //already have the user
            console.log("user is:",currentUser)
            done(null,currentUser)
        }else{
            //if not create new user
            new User({
                googleId: profile.id,
                username: profile.displayName,
                thumbnail:profile._json['picture']
            }).save().then((newUser) => {
                console.log('new user created: ', newUser);
                done(null,newUser)
            });

        }
    }

    )

   
})
)

//acessToken: a token that we receive from Google so that if we want to go back and say after the user profile you know going to their mailbox and their email we can use that access token to do then because we've got it froom Googleright and initially we wanted to do that on the use of granting us permission now we've  NOT DONE THAT IN THIS CASE so we don't really need the 
// access token but that's what it's for the

// refresh token: is to kind of refresh the acess token because this expire after certian amount of time as that's what this is for and again we've not really going to be using these two in the tutorial however this thing right here this profile this is the information that passbook comes back with when it takes the code to google remember that code to google and it brings back 
//the profile information so this is what it's bringing backright here okay and this is a function called done which we need to call when we're done eith thi callback function so 

