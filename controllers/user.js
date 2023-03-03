
const User  = require('../models/user')
const uuid = require('uuid')
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKey");
const bcrypt = require('bcrypt')
const {connectToDatabase} = require('../config/db')


const register =async (req,res)=>{
    try {
        await connectToDatabase()
        const body = req.body
        if(!Object.keys(body).length){
           return  res.status(400).json('body is empty')
        }
        if(!body.password){
            return  res.status(400).json({message:'password  is required',status:true})
        }
        const userDetails = await User.findOne({email:body.email})
        if(userDetails){
            return  res.status(400).json({message:'user already exits',status:true})
        }

        const hashedPassword = await bcrypt.hash(body.password, 10)
        delete  body.password
        const params = {
            _id: uuid.v4(),
            password: hashedPassword ,
            ...body
            
        }
        const response = await  User(params).save()
        return  res.status(200).json({message:'User create successfully',status:true,result:response})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message:error && error.message  ? error.message : 'something went wrong',status:false})
    }

}

const login = async(req,res)=>{
    try {
        await connectToDatabase()
        const {email,password} = req.body
        if(!email){
            return res.status(400).json({message:'email is required',status:true})
        }
        if(!password){
            return res.status(400).json({message:'password is required',status:true})
        }
        const user = await User.findOne({ email:email }).lean();
        if (!user) {
          return res.status(400).send('Invalid email or password');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
           
            const token = jwt.sign({ email: user.email }, 'jwt_secret');
            delete user.password
            const data = {
                ...user,
                token
            }
            return res.status(200).json({ message:'login successfull', status:true ,result:data});
          } else {
            // If passwords don't match, return error response
            return res.status(400).send('Invalid email or password');
          }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message:'something went wrong', status:false, error:error});
    }
}

module.exports = {register,login}
