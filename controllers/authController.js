// const userModel = require('../models/userModel')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

// class authController{
//     user_register = async (req, res) => {
//         const {email, password, username} = req.body

//         try{
//             const get_user = await userModel.findOne({email}).select('+password')
//             if(get_user){
//                 return res.status(400).json({message: 'Email already exists'})   
//             } else{
//                 const user = await userModel.create({
//                     username,
//                     email,
//                     password : await bcrypt.hash(password, 9)
//                 })
//                 const token = await jwt.sign({
//                     username: user.username,
//                     email: user.email,
//                     _id : user.id
//                 }, 'Marinel', {
//                     expiresIn: '2d'
//                 })
//                 return res.status(201).json({message: 'Signup succes', token})
//             }
//         } catch (error) {
//             console.log(error)
//             return res.status(400).json({message: 'Internal server error'})
//         }
//     }
// }

// module.exports = new authController()