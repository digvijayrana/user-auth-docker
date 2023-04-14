const itemModel = require('../models/items')
const {connectToDatabase} = require('../config/db')
const uuid = require('uuid')

const createItem = async(req,res)=>{
    try {
        const body = req.body
        console.log("body",body)
        const data ={
            _id: await uuid.v4().split('-')[0],
            ...body
        }
        console.log(data)
        await new itemModel(data).save()
        return res.status(200).json({message:" item insert successfully",status:true})
    } catch (error) {
      return  res.status(400).json({message: error.message,status:false})
    }
}

const getById = async(req,res)=>{
    try {
        const  id = req.query.id
        if(!id){
            return res.status(400).json({message: "id is required",status:true})
        }
        const response  = await itemModel.findById({_id:id})
        return res.status(200).json({"message": "success",status:true,data: response})
    } catch (error) {
         return res.status(500).json({message: error.message,status:false})
    }
}

const getAllItem = async(req,res)=>{
    try {
        const response  = await itemModel.find()
        return res.status(200).json({"message": "success",status:true,data: response})
    } catch (error) {
        res.status(500).json({message: error.message,status:false})
    }
}

const deleteItem = async(req,res)=>{
    try {
        const id = req.query.id
        if(!id){
            return res.status(400).json({message: "id is required",status:true})
        }
        await itemModel.findByIdAndDelete({_id:id})
        return res.status(200).json({"message": "item delete successfully",status:true})
    } catch (error) {
      return  res.status(500).json({message: error.message,status:false})
    }
}

const updateItem = async (req, res) => {
    try {
        const id = req.query.id
        const body = req.body
        if (!id) {
            return res.status(400).json({ message: "id is required", status: true })
        }
        await itemModel.updateOne({ _id: id }, { "$set": body })
        return res.status(200).json({ "message": "item update successfully", status: true })
    } catch (error) {
        return res.status(500).json({ message: error.message, status: false })
    }
}

module.exports = {
    createItem,
    getById,
    getAllItem,
    deleteItem,
    updateItem
}