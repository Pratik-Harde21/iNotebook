const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");


const JWT_SECRET = "Pratikisagood$boy"


// ROUTE 1: Create a User using: POST "api/auth/". Dosen't require Auth(No Login requires)
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
], async (req, res) => {
    // If there are errors,return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        //Create a new User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData)
        res.json({ authtoken })
        // res.json(user)



        // .then(user => res.json(user))
        // .catch(err=> {console.log(err)
        // res.json({error: 'Please enter a unique value for email', message: err.message})})
        // console.log(req.body)
        // const user = User(req.body)
        // user.save()
        // res.send(req.body)
        // res.send("Hello")

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})



//ROUTE 2: Authenticate a User using: POST "api/auth/login". No ligin required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body   //Destructureing from body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id

            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


// ROUTE 3: Get logggedIn user detail using: POST "/api/auth/getuser" Login required
router.post('/getuser', fetchuser, async (req, res) => {
    
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router