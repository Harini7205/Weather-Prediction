import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config()

const app=express();
const port=3000;
const apiKey=process.env.WEATHER_API_KEY;
var data=null;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs",{content:data});
    data=null;
})

app.post("/submit",async(req,res)=>{
    const lat=req.body.lat;
    const long=req.body.long;
    try{
        const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`);
        data=response.data;
    }
    catch(error){
        console.log(error.message);
        data=null;
    }
    res.redirect("/");
})

app.listen(port,()=>{
    console.log("Server listening at port "+port);

})
