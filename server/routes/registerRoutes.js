import express from 'express';
import * as dotenv from 'dotenv';

import User from '../mongodb/models/user.js';

dotenv.config();

const router = express.Router();

router.route('/').get(async(req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json({ success:  true, data: users});
    } catch (error) {
        res.status(500).json({ success: false, message: error});
    }
});

router.route('/').post(async (req, res) => {

    try {
        //console.log(req.body);
        const { name, email, password } = req.body;

        const userDetail  = await User.findOne({email: email});
        if(userDetail){
            res.send({ success: false, data: "User Already Exists"});
        }
        else {
            const newUser = await User.create({
                name,
                email,
                password
            })
            res.status(201).json({ success: true, data: newUser});
        }
        
    } catch (error) {
        //console.log(error)
        res.status(201).json({ success: false, data: error});
    }
    

})

export default router;