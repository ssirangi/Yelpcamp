var Campground  = require("../models/campground");
var Comment     = require("../models/comments"); 
var middlewareObj={};
// check campground ownership function (middleware)
 middlewareObj.checkCampgroundOwnership= function(req,res,next){
    if(req.isAuthenticated()){ 
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err || !foundCampground){
                req.flash("error","Campground not found");
                res.redirect("back");
            }else{ 
                if(foundCampground.author.id.equals(req.user._id)){
                    next();                
                }else{
                    req.flash("error","You dont have permission to do that");
                    res.redirect("back");
                }
            }
        });
   }else{
       req.flash("error","you have to be logged in to do that");
       res.redirect("back");
   }
}

// check comment ownership function (middleware)

middlewareObj.checkCommentOwnership= function(req,res,next){
    if(req.isAuthenticated()){ 
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err || !foundComment){
                req.flash("error","Comment doesnot exist");
                res.redirect("back");
            }else{ 
                if(foundComment.author.id.equals(req.user._id)){
                    next();                
                }else{
                    req.flash("error","You dont have permission to do that");
                    res.redirect("back");
                }
            }
        });
   }else{
       req.flash("error","You have to be logged in to that");
       res.redirect("back");
   }
}

//middleware
middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error","you're not logged in");
    res.redirect("/login");
}

module.exports=middlewareObj;