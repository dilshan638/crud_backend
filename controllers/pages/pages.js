var pagesModel = require('../../models/pages');
var helpers = require('../helpers/common_functions');
var  moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    create: async function(req,res){
        try{
           if(!req.body.title ||  !req.body.slug || !req.body.content){
               return res.status(400).json({
                   error: "missing required field",
               });
           }
           let find_pages =await helpers.findOne(null, {slug:req.body.slug}, null, null, null, null, null, pagesModel);
          
           
           if(req.body.id){
               let find_page_id =await helpers.findOne(null, {id:req.body.id}, null, null, null, null, null, pagesModel);
                 if((find_page_id.dataValues.slug)==(req.body.slug)){
                   let data = {
                       title: req.body.title,
                       content:req.body.content,
                       updated_at: moment(Date.now()).format("YYYY-MM-DD"),
                       
                   };
                 let update = await pagesModel.update(data, { where: { id:req.body.id} })
                 return res.status(200).json({status:"Updated Successfully"})
               }
               if(find_page_id.dataValues.slug!=req.body.slug){
                   if(find_pages !=null){
                       return res.status(409).json({status:"This page already exists"})
                   }
                   let data = {
                    slug:req.body.slug,
                    title: req.body.title,
                    content:req.body.content,
                    updated_at: moment(Date.now()).format("YYYY-MM-DD"),
                       
                   };
                 let update = await pagesModel.update(data, { where: { id:req.body.id} })
                 return res.status(200).json({status:"Updated Successfully"})
               }
                
           }
           if(find_pages !=null){
               return res.status(409).json({status:"This page already exists"})
           }
            req.body.created_at=moment(Date.now()).format("YYYY-MM-DD"); 
            req.body.updated_at=moment(Date.now()).format("YYYY-MM-DD"); 
            let savedata = await helpers.save(req.body, pagesModel);
          return res.status(200).json({status:"Pages Added Successfully"})
        }catch (error) {
                console.log(error)
                res.status(500).send({message:error})
       } 
    },
    getPages: async function(req,res){
        try{
               let pages = await helpers.findAll(null, null, null, null, null, null, null, pagesModel)
                return res.status(200).json({pages:pages})
        }catch (error) {
                console.log(error)
                res.status(500).send({message:error})
            } 
    },
    deletePage:async function(req,res){ 
       try{
           if(!req.params.id ){
               return res.status(400).json({
                     error: "Missing Required ID",
             })
           }
   
           let delete_page =await helpers.deleteItem(req.params.id, pagesModel);
           return res.status(200).json({status:"Page has been deleted"})
       }catch (error) {
                console.log(error)
                res.status(500).send({message:error})
       } 
    }
}