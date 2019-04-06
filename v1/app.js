var express         =   require("express"),
    app             =   express(),
    bodyParser      =   require("body-parser"),
    mongoose        =   require("mongoose"),
    flash           =   require("connect-flash"),
    passport        =   require("passport"),
    localStrategy   =   require("passport-local"),
    Campground      =   require("./models/campground"),
    Comment         =   require("./models/comments"),
    User            =   require("./models/user"),
    methodOverride  =   require("method-override");
    // seedDB          =   require("./seed.js");


// routes config
var campgroundRoutes = require("./routes/campground"),
    commentsRoutes   = require("./routes/comments"),
    indexRoutes      = require("./routes/index");
    
// app config
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
mongoose.set("useFindAndModify",false);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(flash());

//Passport Configuration
app.use(require("express-session")({
    secret:"Rusty is the best",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentsRoutes);
app.use(methodOverride("_method"));



app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp Camp Server has started");
});

