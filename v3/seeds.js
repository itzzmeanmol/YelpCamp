 var mongoose   = require("mongoose"),
     Campground = require("./models/campground");
    Comment = require("./models/comment");
var data = [
    {
        name: "Red tent",
        image: "https://images.unsplash.com/photo-1515853327920-2567e0b122f7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aa75c85b0c69ee3271a1fa1032953fe2&auto=format&fit=crop&w=500&q=60",
        description: "blah blah blah blah"
    },
    {
        name: "Hilly tent",
        image: "https://images.unsplash.com/photo-1523297741243-79e695ee9a44?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5ca9f6871b71be7ec386093475dca981&auto=format&fit=crop&w=500&q=60",
        description: "blah blah blah blah"
    },
    {
        name: "Canyon floor",
        image: "https://images.unsplash.com/photo-1494545261862-dadfb7e1c13d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3e24a27e43e4985c7852a3bdea697da7&auto=format&fit=crop&w=500&q=60",
        description: "blah blah blah blah"
    } 
    ];



function seedsDb(){
    // Remove all Campgrounds
    Campground.remove({},function(err){
       if(err){
           console.log(err);
       } 
       console.log("Campgrounds Deleted");
    });
    data.forEach(function(seed){
        // Adding a few campgrounds
        Campground.create(seed,function(err,campground){
           if(err){
               console.log(err);
           } 
           else{
               console.log("Campground Added");
               Comment.create(
                   {
                        text: "This place is good, I wish i was internet",
                        author: "Anmol"
               },function(err,comment){
                   if(err){
                       console.log(err);
                   }
                   else{
                    campground.comments.push(comment);
                    campground.save();
                    console.log("Comment Created");
                   }
               });
           }
        });
});
    
}

module.exports = seedsDb;