const express=require('express');
const router=express.Router();
const User=require('../models/user'); ///to register in mongodb/user
const Doctor=require('../models/doctor'); //to register in mongodb/doctor
const Chemist=require('../models/chemist'); //to register in mongodb/chemist
const passport=require('passport');
const jwt=require('jsonwebtoken');
const config=require('../config/database');
const Prescription=require('../models/prescription');
const Medicine=require('../models/medicine');
const Email=require('../emai/email');
const Drug=require('../models/drug');
const Disease=require('../models/disease');
const Blog=require('../models/blog');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Docpresc=require('../models/docpresc');
const Docdis=require('../models/docdis');
const Prescriptionchem=require('../models/prescriptionchemist');
//register
router.post('/register',(req,res)=>{
    let newUser=new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
    });
    User.find({ username:newUser.username,email:newUser.email}).exec((err, user) => {
      if(user)
      {
        //console.log("same name");
        res.json({success:false,msg:'Same username or email exists already'});
      }
      else{

          User.addUser(newUser,(err,user)=>{
              if(err)
              {
                  res.json({success:false,msg:'FAILED TO REGISTER'});

              }
              else{
                  res.json({success:true,msg:'User Registered'});
              }

          });

        }

      });

});



//doctor registration
//register
router.post('/registerdoctor',(req,res)=>{
    let newDoctor=new Doctor({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
    });
    Doctor.find({ username:newDoctor.username,email:newDoctor.email}).exec((err, user) => {
      if(user)
      {
        //console.log("same name");
        res.json({success:false,msg:'Same username or email exists already'});
      }
      else{


    Doctor.addUser(newDoctor,(err,user)=>{
        if(err)
        {
            res.json({success:false,msg:'FAILED TO REGISTER'});
    
        }
        else{
            res.json({success:true,msg:'Doctor Registered'});
        }
    
    });

  }

});
});

//Chemist registration
//register
router.post('/registerchemist',(req,res)=>{
    let newChemist=new Chemist({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
    });

    Chemist.find({ username:newChemist.username,email:newChemist.email}).exec((err, user) => {
      if(user)
      {
        //console.log("same name");
        res.json({success:false,msg:'Same username or email exists already'});
      }
      else{
        Chemist.addUser(newChemist,(err,user)=>{
     





          if(err)
          {
              res.json({success:false,msg:'FAILED TO REGISTER'});
      
          }
          else{
              res.json({success:true,msg:'Chemist Registered'});
          }
      
      });
      }
    });



   

});




//auhtentication
router.post('/authenticate',(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    User.getUserByEmail(email,(err,user)=>{
        if(err){
            throw err;
        }
        if(!user){
            return res.json({success:false,msg:"USER NOT FOUND"});

        }

        User.comparePassword(password,user.password,(err,isMatch)=>{
            if(err){
                throw err;
            }
            if(isMatch){
                const token=jwt.sign({ data: user },config.secret,{
                 // const token=jwt.sign({ userId: user._id },config.secret,{
                   expiresIn:6000 //1min 
                });
                res.json({
                    success:true,
                    token: `Bearer ${token}`,
                    user:{
                        id:user._id,
                        name:user.name,
                        username:user.username,
                        email:user.email,
                        
                    }
                });
            }
            else{
                return res.json({success:false,msg:"WRONG PASSWORD"});
            }
        });

    });
});

//profile

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({user:req.user});
});







  /* 
     Route to get user's profile data
 */
  /*
  router.get('/profile', (req, res) => {
    // Search for user in database
    User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
      // Check if error connecting
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if user was found in database
        if (!user) {
          res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
        } else {
          res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
        }
      }
    });
  });


  */

/*
router.use((req, res, next) => {
  const token = req.headers['Authorization']; // Create token found in headers
  // Check if token was found in headers
  if (!token) {
    res.json({ success: false, message: 'No token provided' }); // Return error
  } else {
    // Verify the token is valid
    jwt.verify(token, config.secret, (err, decoded) => {
      // Check if error is expired or invalid
      if (err) {
        res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
      } else {
        req.decoded = decoded; // Create global variable to use in any request beyond
        next(); // Exit middleware
      }
    });
  }
});

*/





//authentication for doctor
router.post('/authenticatedoctor',(req,res,next)=>{
    const email=req.body.email;
   
    const password=req.body.password;

    Doctor.getUserByEmail(email,(err,user)=>{
        if(err){
            throw err;
        }
        if(!user){
            return res.json({success:false,msg:"USER NOT FOUND"});

        }

        Doctor.comparePassword(password,user.password,(err,isMatch)=>{
            if(err){
                throw err;
            }
            if(isMatch){
               const token=jwt.sign({ data: user },config.secret,{
               //  const token=jwt.sign({ userId: user._id },config.secret,{
                   expiresIn:60000 //1min 
                });
                res.json({
                    success:true,
                   // message: 'Success!',
                    token: `Bearer ${token}`,
                  // token: token,
                    user:{
                        id:user._id,
                        name:user.name,
                        username:user.username,
                        email:user.email,
                        
                    }
                });
               
            }
            else{
                return res.json({success:false,msg:"WRONG PASSWORD"});
            }
        });

    });
});


//authentication for chemist
router.post('/authenticatechemist',(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    Chemist.getUserByEmail(email,(err,user)=>{
        if(err){
            throw err;
        }
        if(!user){
            return res.json({success:false,msg:"USER NOT FOUND"});

        }

        Chemist.comparePassword(password,user.password,(err,isMatch)=>{
            if(err){
                throw err;
            }
            if(isMatch){
                const token=jwt.sign({ data: user },config.secret,{
                   expiresIn:60000 //1min 
                });
                res.json({
                    success:true,
                    token: `Bearer ${token}`,
                    user:{
                        id:user._id,
                        name:user.name,
                        username:user.username,
                        email:user.email,
                        
                    }
                });
            }
            else{
                return res.json({success:false,msg:"WRONG PASSWORD"});
            }
        });

    });
});


//below should be added to another route such as doctor ex /doctor/addprescrption

router.post('/addprescription',(req,res)=>{
    //assign prescirption data from ang to here
    let newPrescription=new Prescription({
        medname:[],
      breakfast:[],
     lunch:[],
     username:req.body.username,
     otp:req.body.otp  
    });
    for(x in req.body.medname){
    newPrescription.medname[x]=req.body.medname[x];
    newPrescription.breakfast[x]=req.body.breakfast[x];
    newPrescription.lunch[x]=req.body.lunch[x];

    }

    //to find email of the user which is in prescription
    User.getUserByUsername(req.body.username,(err,emailobj)=>{
        if(emailobj==null)
        {
            //console.log("err");
            res.json({success:false,msg:'FAILED TO REGISTER PRESCIRPTION'});
        }
        else{
       // console.log("EMAIL IS"+emailobj.email);
       //to send otp in email
        Email.sendEmail(emailobj.email,req.body.otp,(err)=>{
        });


        Prescription.addPrescription(newPrescription,(err,user)=>{
            if(err)
            {
                res.json({success:false,msg:'FAILED TO REGISTER PRESCIRPTION'});
        
            }
            else{
                res.json({success:true,msg:'Prescription added successfully'});
            }
        
        });
    }
    
    });
    




});

router.post('/viewprescription',(req,res)=>{
    //console.log(req.body.uname);

    //checking if uname and otp matches


    //finding precriptoin
    //



    /*
    Prescription.find({username:req.body.uname,otp:req.body.otp},function(err,prescriptions){
        if(!prescriptions)
        {   console.log("FAILED");
            res.json({success:false,msg:'No prescription found'});
    
        }
        else{
            res.json(prescriptions);
       
         }
          //console.log('hello\n');
       //console.log("PRESC:"+prescriptions);    // to get some data of yash prescriptions[1].medname[1]
    });
    
 */
    
    Prescription.authotp(req.body.uname,req.body.otp,(err,prescriptions)=>{
      
        if (Array.isArray(prescriptions) && prescriptions.length) {
            
           res.json(prescriptions);
            console.log(prescriptions);
           
        }
        else{
            console.log("FALSE");
            return res.json({success:false,msg:"Prescirption NOT FOUND"});
        }
    });
   

});    
//below is backip

router.post('/viewprescriptionpat',(req,res,next)=>{
    //console.log("WORD");
    //console.log(req.body.uname);

    Prescription.viewprepat(req.body.uname,(err,prescriptions)=>{
      console.log(prescriptions);
      res.json(prescriptions);
    });



 
});


router.post('/viewprice',(req,res,next)=>{
    
    Medicine.find({medname:req.body.medname},{'_id':0,'id':0},function (err,medicineprice) {
   // Medicine.find({medname:"Crocine"},{'_id':0,'medname':0},function (err,medicine) {
        if (err) return handleError(err);


        let preobj=new Prescriptionchem({

       });
       var tot=0;
       preobj.quantity=req.body.quant;
       for(x in medicineprice){
           tot=tot+(medicineprice[x].price)*(preobj.quantity[x]);
          preobj.medname[x]=medicineprice[x].medname;
          preobj.price[x]=medicineprice[x].price;
        // preobj.quantity[x]=medicineprice[x].quantity;
      }
      preobj.total=tot;

      console.log("pre"+preobj);





       

       res.json(preobj);
     
    });
    
});


//to store drug information in datbase

router.post('/registerdrug',(req,res)=>{
    let newDrug=new Drug({
        mname:req.body.mname,
        desc:req.body.desc,
        uses:req.body.uses,
        pre:req.body.pre,
    });
    Drug.addDrug(newDrug,(err,drug)=>{
        if(err)
        {
            res.json({success:false,msg:'FAILED TO REGISTER'});
    
        }
        else{
            res.json({success:true,msg:'Drug Registered in Database'});
        }
    
    });
});

router.get('/viewdrugs',(req,res,next)=>{
   
    Drug.find(function(err,drug){
        res.json(drug);
        console.log(drug);
       //console.log('hello\n');
       //console.log("PRESC:"+prescriptions);    // to get some data of yash prescriptions[1].medname[1]
    });

 
});


//to register disease in database

router.post('/registerdisease',(req,res)=>{
    let newDisease=new Disease({
        dname:req.body.dname,
        desc:req.body.desc,
        symp:req.body.symp,
        tre:req.body.tre,
        cause:req.body.cause
    });
    Disease.addDisease(newDisease,(err,disease)=>{
        if(err)
        {
            res.json({success:false,msg:'FAILED TO REGISTER'});
    
        }
        else{
            res.json({success:true,msg:'Drug Registered in Database'});
        }
    
    });
});

router.get('/viewdiseases',(req,res,next)=>{
   
    Disease.find(function(err,diseases){
        res.json(diseases);
        console.log(diseases);
       //console.log('hello\n');
       //console.log("PRESC:"+prescriptions);    // to get some data of yash prescriptions[1].medname[1]
    });

 
});


//to view all medicines price

router.get('/viewallprice',(req,res,next)=>{
    //console.log("WORKS");
   
    Medicine.find({},{'_id':0},function (err,medicineprice) {
        
        
       
       res.json(medicineprice);
      
      // console.log(medicineprice);
    });
    
});


router.post('/editmed',(req,res,next)=>{
    
   // console.log(req.body.medname);
   // console.log(req.body.price);
    
    const query={'id':req.body.id};
    const upd={'medname':req.body.medname,
            'price':req.body.price};
    
    Medicine.editandsave(query,upd);
   

});


router.post('/editmed2',(req,res,next)=>{
    
    // console.log(req.body.medname);
    // console.log(req.body.price);
     let ata;
     const query={'id':req.body.id};
     const upd={'medname':req.body.medname,
             'price':req.body.price,
            'quantity':req.body.quantity};

    // Medicine.editandsave(query,upd);
    Medicine.findOneAndUpdate(query, upd,{new:true},function(err,data){
        res.json(data);
    });

});

router.post('/adddrug2',(req,res)=>{
    let newDrug=new Medicine({
        medname:req.body.medname,
        price:req.body.price,
        quantity:req.body.quantity,
        id:req.body.id
    });
    Medicine.addMedicine(newDrug,(err,drug)=>{
        if(err)
        {
            
    
        }
        else{
            res.json(drug);
        }
    
    });
});
router.post('/deldrug2',(req,res)=>{  
    //console.log(req.body.id);
   
    Medicine.deleteOne({ id: req.body.id }, function (err){
        if(err)
        {
            
            console.log(error);
        }
        else{
            res.json("sucess");
        }
    
    });
});

//for blog
router.post('/newBlog', (req, res) => {
       
    // Check if blog title was provided
    if (!req.body.title) {
      res.json({ success: false, message: 'Blog title is required.' }); // Return error message
    } else {
      // Check if blog body was provided
      if (!req.body.body) {
        res.json({ success: false, message: 'Blog body is required.' }); // Return error message
      } else {
        // Check if blog's creator was provided
        if (!req.body.createdBy) {
          res.json({ success: false, message: 'Blog creator is required.' }); // Return error
        } else {
          // Create the blog object for insertion into database
          const blog = new Blog({
            title: req.body.title, // Title field
            body: req.body.body, // Body field
            createdBy: req.body.createdBy // CreatedBy field
          });
          // Save blog into database
          blog.save((err) => {
            // Check if error
            if (err) {
              // Check if error is a validation error
              if (err.errors) {
                // Check if validation error is in the title field
                if (err.errors.title) {
                  res.json({ success: false, message: err.errors.title.message }); // Return error message
                } else {
                  // Check if validation error is in the body field
                  if (err.errors.body) {
                    res.json({ success: false, message: err.errors.body.message }); // Return error message
                  } else {
                    res.json({ success: false, message: err }); // Return general error message
                  }
                }
              } else {
                res.json({ success: false, message: err }); // Return general error message
              }
            } else {
              res.json({ success: true, message: 'Blog saved!' }); // Return success message
            }
          });
        }
      }
    }
  });


  router.get('/allBlogs', (req, res) => {
    // Search database for all blog posts
    Blog.find({}, (err, blogs) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if blogs were found in database
        if (!blogs) {
          res.json({ success: false, message: 'No blogs found.' }); // Return error of no blogs found
        } else {
          res.json({ success: true, blogs: blogs }); // Return success and blogs array
        }
      }
    }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
  });

  /* 
     GET SINGLE BLOG
 */
  router.get('/singleBlog/:id', (req, res) => {
    // Check if id is present in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No blog ID was provided.' }); // Return error message
    } else {
      // Check if the blog id is found in database
      Blog.findOne({ _id: req.params.id }, (err, blog) => {
        // Check if the id is a valid ID
        if (err) {
          res.json({ success: false, message: 'Not a valid blog id' }); // Return error message
        } else {
          // Check if blog was found by id
          if (!blog) {
            res.json({ success: false, message: 'Blog not found.' }); // Return error message
          } else {
            // Find the current user that is logged in
            

          
              /*
            Doctor.findOne({ _id: data._id }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error
              } else {
                // Check if username was found in database
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
                } else {
                  // Check if the user who requested single blog is the one who created it
                  if (user.username !== blog.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to eidt this blog.' }); // Return authentication reror
                  } else {
                    res.json({ success: true, blog: blog }); // Return success
                  }
                }
              }
            });
            */
            

            res.json({ success: true, blog: blog });

          }





        }
      });
    }
  });

  /* 
     UPDATE BLOG POST
  */
  router.put('/updateBlog', (req, res) => {
    // Check if id was provided
    if (!req.body._id) {
      res.json({ success: false, message: 'No blog id provided' }); // Return error message
    } else {
      // Check if id exists in database
      Blog.findOne({ _id: req.body._id }, (err, blog) => {
        // Check if id is a valid ID
        if (err) {
          res.json({ success: false, message: 'Not a valid blog id' }); // Return error message
        } else {
          // Check if id was found in the database
          if (!blog) {
            res.json({ success: false, message: 'Blog id was not found.' }); // Return error message
          } else {






              /*
            // Check who user is that is requesting blog update
            Doctor.findOne({ _id: req.decoded.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                // Check if user was found in the database
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                } else {
                  // Check if user logged in the the one requesting to update blog post
                  if (user.username !== blog.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to edit this blog post.' }); // Return error message
                  } 
                  
                  
                  
                  else {
                    blog.title = req.body.title; // Save latest blog title
                    blog.body = req.body.body; // Save latest body
                    blog.save((err) => {
                      if (err) {
                        if (err.errors) {
                          res.json({ success: false, message: 'Please ensure form is filled out properly' });
                        } else {
                          res.json({ success: false, message: err }); // Return error message
                        }
                      } else {
                        res.json({ success: true, message: 'Blog Updated!' }); // Return success message
                      }
                    });
                  }
                }
              }
            });
              */



            blog.title = req.body.title; // Save latest blog title
            blog.body = req.body.body; // Save latest body
            blog.save((err) => {
              if (err) {
                if (err.errors) {
                  res.json({ success: false, message: 'Please ensure form is filled out properly' });
                } else {
                  res.json({ success: false, message: err }); // Return error message
                }
              } else {
                res.json({ success: true, message: 'Blog Updated!' }); // Return success message
              }
            });












          }
        }
      });
    }
  });


  /* 
     DELETE BLOG POST
 */
  router.delete('/deleteBlog/:id', (req, res) => {
    // Check if ID was provided in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No id provided' }); // Return error message
    } else {
      // Check if id is found in database
      Blog.findOne({ _id: req.params.id }, (err, blog) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Invalid id' }); // Return error message
        } else {
          // Check if blog was found in database
          if (!blog) {
            res.json({ success: false, messasge: 'Blog was not found' }); // Return error message
          } else {




            /*
            // Get info on user who is attempting to delete post
            Doctor.findOne({ _id: req.decoded.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                // Check if user's id was found in database
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                } else {
                  // Check if user attempting to delete blog is the same user who originally posted the blog
                  if (user.username !== blog.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to delete this blog post' }); // Return error message
                  } else {
                    // Remove the blog from database
                    blog.remove((err) => {
                      if (err) {
                        res.json({ success: false, message: err }); // Return error message
                      } else {
                        res.json({ success: true, message: 'Blog deleted!' }); // Return success message
                      }
                    });
                  }
                }
              }
            });
          
          */
          
            // Remove the blog from database
            blog.remove((err) => {
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                res.json({ success: true, message: 'Blog deleted!' }); // Return success message
              }
            });
          
          
          
          
          
          
          
          }

        }
      });
    }
  });
  
  /* 
     Route to get user's public profile data
 */
  router.get('/publicProfile/:username', (req, res) => {
    // Check if username was passed in the parameters
    //console.log(req.params.username);
    if (!req.params.username) {
      res.json({ success: false, message: 'No username was provided' }); // Return error message
    } else {
      // Check the database for username
      Doctor.findOne({ username: req.params.username },(err, user) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Something went wrong.' }); // Return error message
        } else {
          // Check if user was found in the database
          if (!user) {
            res.json({ success: false, message: 'Username not found.' }); // Return error message
          } else {
            res.json({ success: true, user: user }); // Return the public user's profile data
          }
        }
      });
    }
  });



  router.get('/publicProfile1/:username', (req, res) => {
    // Check if username was passed in the parameters
    //console.log(req.params.username);
    if (!req.params.username) {
      res.json({ success: false, message: 'No username was provided' }); // Return error message
    } else {
      // Check the database for username
      Doctor.findOne({ username: req.params.username },(err, user) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Something went wrong.' }); // Return error message
        } else {
          // Check if user was found in the database
          if (!user) {
            res.json({ success: false, message: 'Username not found.' }); // Return error message
          } else {
            res.json({ success: true, user: user }); // Return the public user's profile data
          }
        }
      });
    }
  });










  /*
     LIKE BLOG POST
  */
  router.put('/likeBlog', (req, res) => {
    //console.log(req.body.username);
   
    // Check if id was passed provided in request body
    if (!req.body.id) {
      res.json({ success: false, message: 'No id was provided.' }); // Return error message
    } else {
      // Search the database with id
      Blog.findOne({ _id: req.body.id }, (err, blog) => {
        // Check if error was encountered
        if (err) {
          res.json({ success: false, message: 'Invalid blog id' }); // Return error message
        } else {
          // Check if id matched the id of a blog post in the database
          if (!blog) {
            res.json({ success: false, message: 'That blog was not found.' }); // Return error message
          } else {

            // Get data from user that is signed in
            Doctor.findOne({ _id: req.body.uid }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: 'Something went wrong.' }); // Return error message
              } else {
                // Check if id of user in session was found in the database
                if (!user) {
                  res.json({ success: false, message: 'Could not authenticate user.' }); // Return error message
                } else {
                  // Check if user who liked post is the same user that originally created the blog post
                  if (user.username === blog.createdBy) {
                    res.json({ success: false, messagse: 'Cannot like your own post.' }); // Return error message
                  } else {
                    // Check if the user who liked the post has already liked the blog post before
                    if (blog.likedBy.includes(user.username)) {
                      res.json({ success: false, message: 'You already liked this post.' }); // Return error message
                    } 
                    
                    else {
                      // Check if user who liked post has previously disliked a post
                      if (blog.dislikedBy.includes(user.username)) {
                        blog.dislikes--; // Reduce the total number of dislikes
                        const arrayIndex = blog.dislikedBy.indexOf(user.username); // Get the index of the username in the array for removal
                        blog.dislikedBy.splice(arrayIndex, 1); // Remove user from array
                        blog.likes++; // Increment likes
                        blog.likedBy.push(user.username); // Add username to the array of likedBy array
                        // Save blog post data
                        blog.save((err) => {
                          // Check if error was found
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'Blog liked!' }); // Return success message
                          }
                        });
                      } else {
                        blog.likes++; // Incriment likes
                        blog.likedBy.push(user.username); // Add liker's username into array of likedBy
                        // Save blog post
                        blog.save((err) => {
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'Blog liked!' }); // Return success message
                          }
                        });
                      }
                    }




                  }
                }
              }
            });
          
          
          
          
          
          }
        }
      });
    }
  });

  /* 
     DISLIKE BLOG POST
  */
  router.put('/dislikeBlog', (req, res) => {
    // Check if id was provided inside the request body
    if (!req.body.id) {
      res.json({ success: false, message: 'No id was provided.' }); // Return error message
    } else {
      // Search database for blog post using the id
      Blog.findOne({ _id: req.body.id }, (err, blog) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Invalid blog id' }); // Return error message
        } else {
          // Check if blog post with the id was found in the database
          if (!blog) {
            res.json({ success: false, message: 'That blog was not found.' }); // Return error message
          } else {
            // Get data of user who is logged in
            Doctor.findOne({ _id: req.body.uid }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: 'Something went wrong.' }); // Return error message
              } else {
                // Check if user was found in the database
                if (!user) {
                  res.json({ success: false, message: 'Could not authenticate user.' }); // Return error message
                } else {
                  // Check if user who disliekd post is the same person who originated the blog post
                  if (user.username === blog.createdBy) {
                    res.json({ success: false, messagse: 'Cannot dislike your own post.' }); // Return error message
                  } else {
                    // Check if user who disliked post has already disliked it before
                    if (blog.dislikedBy.includes(user.username)) {
                      res.json({ success: false, message: 'You already disliked this post.' }); // Return error message
                    } else {
                      // Check if user has previous disliked this post
                      if (blog.likedBy.includes(user.username)) {
                        blog.likes--; // Decrease likes by one
                        const arrayIndex = blog.likedBy.indexOf(user.username); // Check where username is inside of the array
                        blog.likedBy.splice(arrayIndex, 1); // Remove username from index
                        blog.dislikes++; // Increase dislikeds by one
                        blog.dislikedBy.push(user.username); // Add username to list of dislikers
                        // Save blog data
                        blog.save((err) => {
                          // Check if error was found
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'Blog disliked!' }); // Return success message
                          }
                        });
                      } else {
                        blog.dislikes++; // Increase likes by one
                        blog.dislikedBy.push(user.username); // Add username to list of likers
                        // Save blog data
                        blog.save((err) => {
                          // Check if error was found
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'Blog disliked!' }); // Return success message
                          }
                        });
                      }
                    }
                  }
                }
              }
            });
          }
        }
      });
    }
  });



router.post('/getdoctormed',(req,res,next)=>{
 // console.log(req.body.did);
  Docpresc.getMedicine(req.body.did,(err,medicine)=>{
    //console.log(medicine);
    var x=[];
    var i;
    for(i in medicine) //fetching string from property mname
    {
      x[i]=medicine[i].mname;
    }
 //  console.log(x);
    res.json(x);
  });
  
  
});

router.get('/getdoctorallmed',(req,res,next)=>{
  // console.log(req.body.did);

  Docpresc.find({}, (err, medicine) => {
    console.log("here");
    console.log(medicine);
    var x=[];
    var i;
    for(i in medicine) //fetching string from property mname
    {
      x[i]=medicine[i].mname;
    }
   console.log(x);
    res.json(x);
  });
  
  
    
   
 });

router.get('/getdoctordis',(req,res)=>{
  

  Docdis.find(null,{'did':0,'_id':0},function(err,diseases){
    var x=[];
    var i;
    for(i in diseases) //fetching string from property dname
    {
      x[i]=diseases[i].dname;
    }
   // console.log(x);
    res.json(x);
  
});
});
router.get('/getdoctordisid',(req,res)=>{
  

  Docdis.find(null,{'_id':0},function(err,diseases){
    
    //console.log("disis"+diseases);
    res.json(diseases);
  
});

  
  
});



router.post('/addprescription2',(req,res)=>{
      let newPrescription=new Prescription({
              medname:req.body.medname,
            breakfast:req.body.breakfast,
          lunch:req.body.lunch,
          quantity:req.body.quantity,
          username:req.body.username,
          otp:req.body.otp 
    });
    //to find email of the user which is in prescription
    User.getUserByUsername(req.body.username,(err,emailobj)=>{
      if(emailobj==null)
      {
          //console.log("err");
          res.json({success:false,msg:'FAILED TO REGISTER PRESCIRPTION'});
      }
      else{
     // console.log("EMAIL IS"+emailobj.email);
     //to send otp in email
      Email.sendEmail(emailobj.email,req.body.otp,(err)=>{
      });

    Prescription.addPrescription(newPrescription,(err,prescription)=>{
      if(err)
      {
          res.json({success:false,msg:'FAILED TO REGISTER PRESCIRPTION'});
  
      }
      else{
           res.json({success:true,msg:'Prescription added successfully'});
      }
  
  });

}


});
});

/*
     COMMENT ON BLOG POST
 */
router.post('/comment', (req, res) => {
  // Check if comment was provided in request body
  if (!req.body.comment) {
    res.json({ success: false, message: 'No comment provided' }); // Return error message
  } else {
    // Check if id was provided in request body
    if (!req.body.id) {
      res.json({ success: false, message: 'No id was provided' }); // Return error message
    } else {
      // Use id to search for blog post in database
      Blog.findOne({ _id: req.body.id }, (err, blog) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Invalid blog id' }); // Return error message
        } else {
          // Check if id matched the id of any blog post in the database
          if (!blog) {
            res.json({ success: false, message: 'Blog not found.' }); // Return error message
          } else {
            // Grab data of user that is logged in
            Doctor.findOne({ _id: req.body.uid }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: 'Something went wrong' }); // Return error message
              } else {
                // Check if user was found in the database
                if (!user) {
                  res.json({ success: false, message: 'User not found.' }); // Return error message
                } else {
                  // Add the new comment to the blog post's array
                  blog.comments.push({
                    comment: req.body.comment, // Comment field
                    commentator: user.username // Person who commented
                  });
                  // Save blog post
                  blog.save((err) => {
                    // Check if error was found
                    if (err) {
                      res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                    } else {
                      res.json({ success: true, message: 'Comment saved' }); // Return success message
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  }
});

router.post('/updquant',(req,res)=>{
    var x=0;
  console.log(req.body.medname);
  console.log(req.body.quantity);
   let ata;

   for(x in req.body.quantity)
   {
    const query={'medname':req.body.medname[x]};
    const upd={'quantity':req.body.quantity[x]};


  
    Medicine.findOneAndUpdate(query, {$inc:{'quantity':-req.body.quantity[x],'sales':req.body.quantity[x]}},{new:true},function(err,data){
     //im not returning anything
     
   });
   }
  

});

router.get('/graph',(req,res)=>{
  var obj=[{name:null,y:null}];
  Medicine.find(null,{'_id':0,'id':0,'price':0,'__v':0},function(err,medicine){
    
    obj.shift(); //so that null gets removed
    for (var i = 0; i < medicine.length; i++) {
      var o = medicine[i];
      obj.push({name:o.medname,
                y:o.quantity});
     // obj1[i].name=o.medname;
      //obj1[i].y=o.quantity;
      


   
  }
  console.log(obj);

  res.json(obj);
   //console.log('hello\n');
   //console.log("PRESC:"+prescriptions);    // to get some data of yash prescriptions[1].medname[1]
});



});

router.get('/graph2',(req,res)=>{
  var obj=[{name:null,y:null}];
  Medicine.find(null,{'_id':0,'id':0,'price':0,'__v':0,'quantity':0},function(err,medicine){
    console.log("2");
    console.log(medicine);
    obj.shift(); //so that null gets removed
    for (var i = 0; i < medicine.length; i++) {
            var o = medicine[i];
            obj.push({name:o.medname,
                      y:o.sales});

           }
  console.log(obj);

  res.json(obj);
   //console.log('hello\n');
   //console.log("PRESC:"+prescriptions);    // to get some data of yash prescriptions[1].medname[1]
});



});


module.exports=router;