require('dotenv').config();
const mongoose = require('mongoose');


const {DB_URL} = process.env


// Establish MongoDB connection
const connectToDB = async () =>{
    try {
        await mongoose.connect(DB_URL,{
        
        })
    
        console.log('Database connected')
        
    } catch (error) {
        console.log(error)
    }

}

connectToDB()


