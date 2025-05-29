// const User = require('../models/user')
// const {hashPassword,comparePassword} = require('../helpers/auth')
// const jwt = require('jsonwebtoken')

// const test = (req,res)=>{
//     res.json('test is working')
// }
// // reg endpoint
// const registerUser = async(req,res)=>{
//     try{
//         const {name,email,password} = req.body;
//         //check if name was enterd
//         if(!name){
//             return res.json({
//                 error : 'name is requird'
//             })
//         }
//         //check if password is good
//         if(!password|| password.length < 6){
//             return res.json({
//                 error:"password is required and shoud be at least 6 characters loang"
//             })
//         }
//         //cheack the email
//         const exist = await User.findOne({email})
//         if(exist){
//             error:'Email is taken already'
//         }

//         const hashashPassword = await hashPassword(password)
//         //create user
//         const user = await User.create({
//             name,email,password : hashashPassword
//         })
//         return res.json(User)
//     }catch(error){
//         console.log(error)
//     }
// }

// //login endpoint
// const loginUser = async(req,res)=>{
//     try{
//         const{email,password} = req.body;

//         //check if user exit
//         const user = await User.findOne({email});
//         if(!user){
//             return res.json({
//                 error:'No user found'
//             })
//         }

//         //check if password match
//         const match = await comparePassword(password,user.password)
//         if(match){
//             jwt.sign({email:user.email,id:user._id, name: user.name},process.env.JWT_SECRET,{},(err,token)=>{
//                 res.cookie('token',token).json(user)
//             })
//         }
//         if(!match){
//             res.json({
//                 error: 'Password do not match'
//             })
//         }
//     }catch(error){
//         console.log(error)
//     }
// }

// const getProfile = (req,res) =>{
//     const {token} = req.cookies
//     if(token){
//         jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
//             if(err) throw err;
//             res.json(user)
//         })
//     }else{
//         res.json(null)
//     }
// }

// module.exports = {
//     test,
//     registerUser,
//     loginUser,
//     getProfile
// }

const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
};

// Register endpoint
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validation
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ 
                error: 'Password is required and should be at least 6 characters long' 
            });
        }
        
        // Check if email exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ error: 'Email is already taken' });
        }

        // Create user
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json(user);

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Login endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'No user found' });
        }

        // Check password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Create token
        jwt.sign(
            { email: user.email, id: user._id, name: user.name },
            process.env.JWT_SECRET,
            {},
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
            }
        );

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Profile endpoint
const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json(null);
    }
    
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.json(user);
    });
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
};