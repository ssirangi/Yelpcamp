var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comments");
var data = [
    {
        name:"Hot Springs",
        image:"https://boyslifeorg.files.wordpress.com/2014/04/tent-featured.jpg?w=620&h=465",
        description:"Lorem ipsum dolor sit amet, an quo sint summo numquam. Quo eros vivendum et. Vel cu mutat paulo mentitum, eu quis elit definiebas duo. Vocent suscipiantur at vix, ut partiendo definitiones duo, sint habeo aliquando et vis"
    },
    {
        name:"Hot Summers",
        image:"https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description:"This is my second campsite"
    },
    {
        name:"Cold Winters",
        image:"https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description:"This is my third campsite"
    }
    ];
function seedDB(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        //remove comments
        Comment.remove({},function(err){
            if(err){
                console.log(err);
            }
            console.log("removed comments");
        //add campgrounds
            // data.forEach(function(seed){
            //     Campground.create(seed,function(err,campground){
            //         if(err){
            //             console.log(err);
            //         }else{
            //             console.log("added campgrounds");
            //             Comment.create({
            //                 text:"This is a wonderful campground with a great environment",
            //                 author:"Mark Buttler"
            //             },function(err,comment){
            //                 if(err){
            //                     console.log(err);
            //                 }else{
            //                     campground.comments.push(comment);
            //                     campground.save();
            //                     console.log("created a comment");
            //                 }
            //             });
                   
            //         }
                    
            //     });
            // });
        });
    });
}
module.exports=seedDB();