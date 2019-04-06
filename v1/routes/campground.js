var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var methodOverride=require("method-override");
var middleware=require("../middleware"); // (here by requiring the directory it actually means that we require index file(as it is considered as home for any directory)
// Campground create
router.use(methodOverride("_method"));
router.post("/", middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCampground={name:name,price:price,image:image,description:desc,author:author};
    Campground.create(newCampground,function(err,campground){
        if(err){
                 console.log(err);
          }else{
             req.flash("success","New Campground has been created")
             res.redirect("/campgrounds");
            }
    });
});

//Campground Index

router.get("/",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});
// Campground New
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

// Campground Show

router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err|| !foundCampground){
            req.flash("error","Campground doesnot exist");
            return res.redirect("/campgrounds");
        }
        else{
             res.render("campgrounds/show",{campground:foundCampground});  
        }
    });
});

// Campground Editing

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){ 
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err || !foundCampground){
                res.redirect("/");
            }else{
                    res.render("campgrounds/edit",{campground:foundCampground});                
                }
        });
});

//Campground Update

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err|| !updatedCampground){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Campground delete

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            req.flash("error","Campground has not been deleted");
            res.redirect("/campgrounds");
        }else{
            req.flash("success","Campground has been deleted");
            res.redirect("/campgrounds");
        }
        
    });
});


module.exports=router;

//user authentication and authorization
// router.get("/:id/edit",function(req,res){ 
//     if(req.isAuthenticated()){          // checking for the authentication of logged in or not?
//         Campground.findById(req.params.id,function(err,foundCampground){
//             if(err){
//                 res.redirect("/");
//             }else{  //if logged in, authorizing the correct user to edit /update the campgrounds
//                 if(foundCampground.author.id.equals(req.user._id)){
//                     res.render("campgrounds/edit",{campground:foundCampground});                
//                 }else{
//                     res.send("you are not logged in ..!!");
//                 }
//             }
//         });
//     }
//});