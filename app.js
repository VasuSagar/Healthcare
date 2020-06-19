const express=require('express');
const path=require('path');
const bodyparser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
//connecting with db
const config=require('./config/database');
mongoose.connect(config.database,{ useNewUrlParser: true,useUnifiedTopology: true});
//on getting successfull connection
mongoose.connection.on("connected",()=>{
    console.log("DB CONNECTED:"+config.database);
});
//on getting error
mongoose.connection.on("error",(err)=>{
    console.log("DB ERROR"+err);
});


const app=express();
const port=1331;

const users=require('./routes/users');
//for blog posts
const blogs=require('./routes/blogs');

app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname,'public')));

app.use(bodyparser.json());

//for authtenciation and token
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
 
app.use('/users',users);
app.use('/blogs',blogs);


app.get('/',(req,res)=>{
    res.send("SERVER")
});




app.listen(port,()=>{
    console.log('SERVER IS ON PORT:'+port);
});