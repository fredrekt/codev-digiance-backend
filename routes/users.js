const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

// GET

// get all
router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } 
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get single user
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const email = id
    try {
        const user = await User.findOne({ email })
        if(user) res.status(201).json(user)
        else res.status(201).json({ message: "no user found" })
    } 
    catch (error) {
     res.status(501).json({ message: error.message })   
    }
})

// POST

// create user
router.post('/', async (req, res) => {
    const { email, password } = req.body
    const encryptPassword = await bcrypt.hash(password, 10)

    const user = new User({
        email: email,
        password: encryptPassword
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } 
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        console.log(`${email} & ${password}`)
        const user = await User.findOne({ email })

        if(user && (await bcrypt.compare(password, user.password))){
            res.status(200).json(user);
        }

        res.status(400).json({ message: "Wrong Credentials!" })
    } 
    catch (error) {
        res.status(500).json({ message: "Something wen't wrong!" })
    }
})

// PATCH

// update one user
router.patch('/change-password', async (req, res) => {
    const { email, password } = req.body
    const encryptPassword = await bcrypt.hash(password, 10)
    try {
        const user = await User.findOneAndUpdate(
            {
                email
            },
            {
                password: encryptPassword
            },
            {
                new: true
            }
        )
        res.status(201).json(user)
    } 
    catch (error) {
        res.status(400).json({ message: error.message })    
    }
})

// DELETE

// delete one user
router.delete('/', async (req, res) => {
    try {
        const deleteAll = await User.deleteMany()
        res.status(200).json(deleteAll)
    } 
    catch (error) {
        res.status(500).json({ message: error.message }) 
    }
})

module.exports = router