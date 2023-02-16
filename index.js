       //APP entry point
        const express = require('express');                                 //import express
        const app = express();                                              //initializing express              
        const bodyparser = require('body-parser');   
        const db  = require('./dataBase/db');

        const carRouter = require('./routes/cars');                         //connecting/importing to the cars route
        const ownerRouter = require('./routes/owners');                     //connecting to the owners route
        const employeeRouter = require('./routes/employees');               //connecting to the employees route
        const owners =  require('./models/owners');                         //initializing 
        const bcrypt = require('bcrypt');                                   //importing bcrypt

        app.use(express.static('public'));
        app.use(express.json());
        app.use(bodyparser.json());

        const port = process.env.PORT;                                      //define your port
        db.connectToMongoDB();                                              //connect to MongoDB
        

       
        /*app.get("/homepage", (req,res) => {                               //Homepage in JSON format
            res.status(200).json({message: "Hi there! Welcome to my CARLOT"});
            });*/

        app.use('/cars', carRouter);                                        //using books router
        app.use('/owners', ownerRouter);                                    //using authors router
        app.use('/employees', employeeRouter);                              //using users router
                               
//Hashing password
    /*OwnersSchema.pre('save', function(next) {
        if(this.password) {
            const salt = bcrypt.genSaltSync(10)
            this.password = bcrypt.hashSync(this.password, salt)
            }
            next()
        })*/
//SIGN-IN..............................................................................
            app.post('/signin', async (req,res) =>{
                const {username, password} = req.body;
                const owner = await owner.findOne({owner})
                    if (!owner){
                        return res.status(401).json({
                            message:"Not a owner"
                        });
                    }
                    const isPasswordMatch = await bcrypt.compare(password, owner.password)

                    if (isPasswordMatch){
                    const token = Buffer.from(`${username}:${password}`).toString('base64');
                    return res.status(200).json({
                        message:"Auth successful",
                        token
                    });
                }else {
                    return res.status(401).json({
                        message:"Auth failed"
                    });
                }
                })

//MIDDLEWARE............................................................................
async function authentication(req, res, next) {
    if (req.headers.authorization) {
        const authHeader = req.headers.authorization.split(' ');

        const authType = authHeader[0]; 
        const authValue = authHeader[1];
                
        if (authType === 'Basic') {        
            const [username, password] = Buffer.from(authValue, 'base64').toString().split(':');
            const owner = await owners.findOne({username});
            if (!owner) {
                return res.status(401).json({
                    message: 'Authentication failed'
                });
            }
    //compare passwords
            const isPasswordMatch = await bcrypt.compare(password, owner.password)
            if (isPasswordMatch) {     
                req.owner = owner.username;              
                next();                                 
            } else { 
                return res.status(401).json({     
                    message: 'Owner or Password is incorrect'
                });
            }
        } else {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Auth header not present'
        });
    }
}


app.listen(port, () => {
    console.log(`bookStore is running on http://localhost:${port}`)
});
