const express = require('express')
const router = express.Router()
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

router.post('/charge', async (req, res) => {
    const token = req.body.stripeToken;
    try {
        const charge = await stripe.charges.create({
            amount: 10000,
            currency: 'usd',
            description: 'Codev Charge Fred',
            source: token,
        });
        res.status(201).json(charge)
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

module.exports = router