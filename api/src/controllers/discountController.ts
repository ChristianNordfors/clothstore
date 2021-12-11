import { Request, Response } from "express"
import UserSchema, { User } from "../models/user";
import carritoSchema, { Carrito } from '../models/carrito';
import PublicationSchema from '../models/publication';
import DiscountSchema from '../models/discount';
import { FilterQuery } from "mongoose";



export default class DiscountController {
    static async postDiscount(req: Request, res: Response) {
        const { publicationId, authorId, percentage, amount, expirationDate } = req.body;

        try {
            const discountCreated = new DiscountSchema({ publication: publicationId, author: authorId, percentage, amount });



            discountCreated.expireAt = expirationDate;

            await discountCreated.save();

            const publication = await PublicationSchema.findById(publicationId);

            if (publication) {

                await DiscountSchema.findByIdAndRemove(publication.discount);

                publication.discount = discountCreated._id;
                await publication.save();
            }

            return res.json(discountCreated)

        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }

    }
}