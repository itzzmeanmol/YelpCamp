var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
    
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

// Campground Schema Setup
var campgroundSchema = new mongoose.Schema({
   name:String,
   image:String,
   description:String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create({
//     name:"Granite Hill",
//     image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec456c4aeb71d3aecbe65e586d186ec0&auto=format&fit=crop&w=500&q=60",
//     description: "Beautiful hill, no water, no bathrooms"
// },function(err,campground){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("New campground added:");
//         console.log(campground);
//     }
// });

app.get("/",function(req,res){
    res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds",function(req,res){
    // getting all campgrounds from db
    Campground.find({},function(err,allCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{campgrounds:allCampground});
        }
    })
    //res.render("campgrounds",{campgrounds:campgrounds});
});

// CREATE - add new campground to db
app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc};
    // creating a new campground and saving it to db
    Campground.create(newCampground,function(err,campground){
       if(err){
           console.log(err);
       } 
       else{
            res.redirect("/campgrounds");
       }
    });
    //campgrounds.push(newCampground);
});

// NEW - show form to create new campground
app.get("/campgrounds/new",function(req,res){
   res.render("new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id",function(req,res){
    // find the campground with the provided id
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show",{campground:foundCampground});
        }
    })
    // render show template with that campground
    
})

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Yelp Camp Server Started");
});