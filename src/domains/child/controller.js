
const Child = require('./model')



const addChild = async (name,age,grade,parentId) => { 
  try {

    const newChild = new Child({ name, age, grade, parent: parentId }); 

    // Save the new child
    const createdChild = await newChild.save();
    console.log(createdChild)
    return createdChild
  } catch (error) {
    throw error
  }
};

const updateChild = async (childId, data) => {
  try {
    const updatedChild = await Child.findByIdAndUpdate(childId, data, { new: true }); 

    if (!updatedChild) {
      throw new Error('Child not found');
    }

    return updatedChild;
  } catch (error) {
    throw error;
  }
};

const deleteChild = async (childId) => {
  try {
    const deletedChild = await Child.findByIdAndDelete(childId);

    if (!deletedChild) {
      throw new Error('Child not found');
    }

    return deletedChild; // 
  } catch (error) {
    throw error;
  }
};

// Export functions at the bottom
module.exports = { addChild, updateChild, deleteChild };
