const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth"); // Import your authentication middleware
// const extractParentId = require('../../middleware/extractParentId');
const { addChild ,updateChild,deleteChild} = require("./controller");
const User = require('../user/model')


//add a new child
router.post("/", async(req,res)=>{
    try {

        const {name, age,grade,parentId}= req.body;
        // const parentId = req.currentUser._id//assuming there is a middleware tp get current user

        const existingUser = await User.findOne({_id: parentId});

        if(!existingUser){
          res.status(201).json({
            message: 'no such parent'
          });
        }
        
        const newChild= await addChild (name, age, grade,parentId);
        res.status(201).json(newChild);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});


// Update an existing child
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, age, grade } = req.body;
  
      const updatedChild = await updateChild(id, { name, age, grade });
      res.json(updatedChild);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete an existing child
  router.delete("/:id", auth, async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedChild = await deleteChild(id);
      res.json(deletedChild);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


  module.exports= router;

