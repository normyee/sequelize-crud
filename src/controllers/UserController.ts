import {Request, Response} from "express";
import { UserModel as User} from "../model/UserModel";

class UserController {
    async getAllUsers(req: Request, res: Response) {
        const users = await User.findAll();
        return users.length > 0 ? res.status(200).json({status: "Ok", users: users}) : res.status(204).json({status: "Error", message: "No Content."});
    };

    async getUser(req: Request, res: Response) {
        const {id} = req.params;
        const user = await User.findOne({
            where: {
                id: id,
            },
        });
        return user ? res.status(200).json(user) : res.status(204).json({status: "Error", message: "No Content."});
    };
    async newUser(req: Request, res: Response) {
        const {email, name, age} = req.body;
        const newUser = User.build({email: email, name: name, age: age});
        try 
        {
            await newUser.save();
            return res.status(201).json({status: "Ok", message:"New user was saved to the database."});
        }
        catch(error) 
        {
            return res.status(422).json({status: "Error", message: "Error occurred", error});
        }
    };

    async patchUser(req: Request, res: Response) {
        const {id} = req.params;
        await User.update(req.body, {where: {id: id}});
        return res.status(204).json({status: "Updated", message: "Updated successfully."});
    };
    async deleteUser(req: Request, res: Response) {
        const {id} = req.params;
        await User.destroy({where: {id: id}});
        return res.status(204).json({status: "Deleted", message: "Deleted successfully."});
    };
}

export default new UserController;
