import jwt from "jsonwebtoken";

const genToken = async (userid) => {
    try{
        let token = await jwt.sign({ id: userid }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return token;

    }catch(error){
        console.error("Token generation failed:", error.message);
        throw new Error("Token generation failed");
    }
}

export default genToken;


export const genToken1 = async (email) => {
    try{
        let token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return token;

    }catch(error){
        console.error("Token generation failed:", error.message);
        throw new Error("Token generation failed");
    }
}
