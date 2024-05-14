const User= require("./model")
const {hashData,verifyHashedData} = require("../../utils/hashData");
const createToken = require("./../../utils/createToken")


const authenticateUser = async(data)=>{
    try {
        const{email,password}=data;

        const fetchedUser = await User.findOne({email})

    

        if (!fetchedUser){
            return { error: "Invalid email entered" }; // Return error message
        }

        if (!fetchedUser.verified){
            return { error: "Email hasn't been verified yet, check your inbox" }; // Return error message
        }
        
        const hashedPassword = fetchedUser.password;
        const passwordMatch = await verifyHashedData(password,hashedPassword)

        if (!passwordMatch){
            throw Error('Invalid password entered!')
        }

        //create user token 
        const tokenData = {userId:fetchedUser._id,email}
        const token = await createToken(tokenData);


        //assign user token
        fetchedUser.token= token
        return fetchedUser;

        
    } catch (error) {
        throw error;
    }
}

const createNewUser= async(data)=>{
    try {
        const{name,email,password}=data;

        //checking if user already exist

        const existingUser = await User.findOne({email});

        if (existingUser){
            throw Error("User with the provided email aleady exist")
        }

        //hash password
        const hashedPassword= await hashData(password);
        const newUser = new User({
            name,
            email,
            password:hashedPassword
        });

        //save user
        const createdUser= await newUser.save();
        return createdUser;
    } catch (error) {
        
        if (error.code === 11000 && error.keyValue.email) {
            return {error: "User with the provided email already exists"};
        } else {
            throw error; // Re-throw other errors for generic handling
        }
    }
}


module.exports={createNewUser, authenticateUser}