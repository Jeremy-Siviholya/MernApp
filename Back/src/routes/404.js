const express=require('express')
const router=express.Router()

router.get('*',(req,res)=>{
    res.status(404).send('Erreur page 404 not found')
})

module.exports=router