const Child = require('./model');
const User = require('../user/model');
const { hashData } = require('../../utils/hashData');

// Add a new child
const addChild = async ({ name, age, grade, parent }) => {
    try {
        const newChild = new Child({
            name,
            age,
            grade,
            parent
        });

        const createdChild = await newChild.save();
        return createdChild;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update an existing child
const updateChild = async (id, { name, age, grade }) => {
    try {
        const updatedChild = await Child.findByIdAndUpdate(
            id,
            { name, age, grade },
            { new: true }
        );

        return updatedChild;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Delete an existing child
const deleteChild = async (id) => {
    try {
        const deletedChild = await Child.findByIdAndDelete(id);
        return deletedChild;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { addChild, updateChild, deleteChild };
