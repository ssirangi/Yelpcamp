var mongoose=require("mongoose");
var campgroundSchema=new mongoose.Schema({
        name:String,
        price:String,
        image:String,
        description:String,
        author:{
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            username:String
        },
        comments:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }]
    });
module.exports=mongoose.model("Campground",campgroundSchema);

// Campground.create({
//         name:"Acadia National Park", 
//         image:"https://boyslifeorg.files.wordpress.com/2014/04/tent-featured.jpg?w=620&h=465",
//         description: "The acadia national park has a variety of campsites surrounded by beautiful environment and a play area for kids"
//     }, function(err,Campgrounds){
//     if(err){
//         console.log("Something Went Wrong");
//     }else{
//         console.log(Campgrounds);
//     }
// });
    