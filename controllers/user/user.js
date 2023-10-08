var usersModel = require('../../models/users');
var helpers = require('../helpers/common_functions');
var  moment = require('moment');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs')
const dotenv = require('dotenv');
const CryptoJS = require('crypto-js')
dotenv.config();
module.exports = {
 create: async function(req,res){
     try{
        if(!req.body.first_name ||  !req.body.last_name || !req.body.email || !req.body.password ){
            return res.status(400).json({
                error: "missing required field",
            });
        }
        let find_user =await helpers.findOne(null, {email:req.body.email}, null, null, null, null, null, usersModel);
         req_password=req.body.password
        const ciphertext = CryptoJS.AES.encrypt(req_password,"HaSHKeyop3NadM!#@!").toString();
        console.log(ciphertext)
        req.body.password=ciphertext
        if(req.body.id){
            let find_user_id =await helpers.findOne(null, {id:req.body.id}, null, null, null, null, null, usersModel);
              if((find_user_id.dataValues.email)==(req.body.email)){
                let data = {
                    first_name: req.body.first_name,
                    last_name:req.body.last_name,
                    password: req.body.password,
                    updated_at: moment(Date.now()).format("YYYY-MM-DD"),
                    
                };
              let update = await usersModel.update(data, { where: { id:req.body.id} })
              return res.status(200).json({status:"Updated Successfully"})
            }
            if(find_user_id.dataValues.email!=req.body.email){
                if(find_user !=null){
                    return res.status(409).json({status:"This email already exists"})
                }
                let data = {
                    email:req.body.email,
                    first_name: req.body.first_name,
                    last_name:req.body.last_name,
                    password: req.body.password,
                    updated_at: moment(Date.now()).format("YYYY-MM-DD"),
                    
                };
              let update = await usersModel.update(data, { where: { id:req.body.id} })
              return res.status(200).json({status:"Updated Successfully"})
            }
             
        }
        if(find_user !=null){
            return res.status(409).json({status:"This email already exists"})
        }
         req.body.created_at=moment(Date.now()).format("YYYY-MM-DD"); 
         req.body.updated_at=moment(Date.now()).format("YYYY-MM-DD"); 
         let savedata = await helpers.save(req.body, usersModel);
        //mail send

        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            auth: {
                user:  process.env.USER_EMAIL,
                pass:  process.env.PASSWORD_EMAIL,
            },
          });
          
          var html = fs.readFileSync(path.join(__dirname, '../../public/templates') + '/email_verification_code.html', 'utf8');
          contents2 = await html.replace("{{Title}}","Congratulations, You are now a Hash Maldives member.");
          // Define the email options
          const mailOptions = {
            from:  process.env.USER_EMAIL,
            to:   req.body.email,
            subject: 'Hash Maldives Registration',
            html: contents2,
          };
          
          // Send the email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error occurred:');
              console.log(error.message);
            } else {
              console.log('Email sent successfully!');
              return res.status(201).json({status:"User Created Successfully, Please check your email"})
            }
          });
       
     }
   catch (error) {
             console.log(error)
             res.status(500).send({message:error})
    } 
 },
 getUsers: async function(req,res){
     try{
            let users = await helpers.findAll(null, null, null, null, null, null, null, usersModel)
             return res.status(200).json({user:users})
     }catch (error) {
             console.log(error)
             res.status(500).send({message:error})
         } 
 },
 deleteUser:async function(req,res){
    try{
        if(!req.params.id ){
            return res.status(400).json({
                  error: "Missing Required ID",
          })
        }

        let delete_user =await helpers.deleteItem(req.params.id, usersModel);
        return res.status(200).json({status:"User has been deleted"})
    }catch (error) {
             console.log(error)
             res.status(500).send({message:error})
    } 
 }
}