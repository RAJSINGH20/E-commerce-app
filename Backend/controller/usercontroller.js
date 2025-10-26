import User from "../model/usermodel.js";

export const getcurrentUser = async (req, res) => {
    try{
        let user = await User.findById(req.userId).select("-password");

        
        if(!user){
            return res.status(404).json({message: "User not found"});
        }


        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}