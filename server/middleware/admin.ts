import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma.js";


const admin = async (req: Request, res:Response, next: NextFunction)=>{
    try {
        const userId = req.user?.id;
        if(!userId){
            return res.status(401).json({message: "Unauthorized"})
        }
        const user = await prisma.user.findUnique({where: {id: userId}})
        if(!user){
            return res.status(404).json({message: "User not found"})
        }


        
    } catch (error: any) {
        console.log(error);
        res.status(500).json({message: "Admin verification failed", error: error.message})
    }
}

export default admin;