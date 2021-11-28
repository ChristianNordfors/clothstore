import { Request, Response } from "express"
import UserSchema, { User } from "../models/user";
import PublicationSchema, { Publication } from "../models/publication";

export default class PublicationController {

    static async setPublication(req: Request, res: Response) {

        const { publicationId } = req.query;

        try {
            const { name, images, id, stock, mark, detail, price, category, gender } = req.body
            function numOrder() {
                const value: string = (Math.random() *0xffffff *1000000).toString(16);
                return `${value.slice(0,6)}`
            }
            const order: string = numOrder();

            if (publicationId) {
                await PublicationSchema.findByIdAndUpdate(publicationId, { name, images, stock, mark, detail, price, category, gender, order }, {new: true});
            } else {
                const publication: Publication = new PublicationSchema({ name, images, stock, mark, detail, price, category, gender, order, author: id });
                await publication.save();
                const user = await UserSchema.findById(id)

                user?.publications.push(publication)
                await user?.save();
            }

            res.sendStatus(200);
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }

    static async getPublications(req: Request, res: Response): Promise<void> {
        try {
            const { page, order, name } = req.query

            const { mark, category, gender, price, author } = req.body
            
            let pag: number = page ? +page : 1;
            const charXPage: number = 9;

            let allPublications: Array<any>;
            allPublications = await PublicationSchema.find()

            if (name && name !== "") {
                allPublications = allPublications.filter(e => {
                    return e.name.search(name) > -1;
                });
            }
            switch(order){
                case "pmin":
                    allPublications = allPublications.sort(( a, b )=>{
                        if(a.price  > b.price) return 1
                        else if(a.price < b.price) return -1
                        else return 0
                    })
                    break;
                case "pmax":
                    allPublications = allPublications.sort(( a, b )=>{
                        if(a.price < b.price) return 1
                        else if(a.price > b.price) return -1
                        else return 0
                    })
                    break;
                case "des":
                    allPublications = allPublications.sort(( a, b )=>{
                        if(a.order < b.order) return 1
                        else if(a.order > b.order) return -1
                        else return 0
                    })
                    break;
                case "":
                default:
                    allPublications = allPublications.sort(( a, b )=>{
                        if(a.order > b.order) return 1
                        else if(a.order < b.order) return -1
                        else return 0
                    })
                    break;
            }
            // filtros { mark, category, gender, price, author }
            
            if (mark && mark !== "") {
                allPublications = allPublications.filter(e => {
                    return e.mark == mark;
                });
            }
            
            if (category && category !== "") {
                allPublications = allPublications.filter(e => {
                    return e.category == category;
                });
            }
            
            if (gender && gender !== "") {
                allPublications = allPublications.filter(e => {
                    return e.gender == gender;
                });
            }
            
            if (author && author !== "") {
                allPublications = allPublications.filter(e => {
                    return e.author == author;
                });
            }

            if (price && price !== "") {
                allPublications = allPublications.filter(e => {
                    if(price.search("< ") > -1){
                        return price.split("< ")[1] <= e.price;
                    }
                    if(price.search(" >") > -1){
                        return ((e.price >= price.split(" > ")[0]) && (e.price <= price.split(" > ")[1]));
                    }
                    if(price.search("> ") > -1){
                        return price.split("> ")[1] >= e.price;
                    }
                    if(price.search("=") > -1){
                        return e.price == price.split("= ")[1];
                    }
                });
            }
          
            allPublications = allPublications.slice((charXPage * (pag - 1)), (charXPage * (pag - 1)) + charXPage)

            res.json(allPublications);
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }

    static async deletePublications(req: Request, res: Response): Promise<void> {
        try {
            const { _id } = req.params
            await PublicationSchema.deleteOne({ _id })
            res.json("Elemento Borrado")
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    }

    static async putStock(req: Request, res: Response): Promise<void> {
        try {
            const { id, stock } = req.body
            await PublicationSchema.findById(id).updateOne({ stock: stock })
            res.send("stock modificado");
        } catch (e) {
            console.log(e)
        }
    }

    static async getPublication(req: Request, res: Response): Promise<void> {
        try {
            const { publicationId } = req.query;

            const publication = await PublicationSchema.findById(publicationId);

            if (publication) {
                res.json(publication);
            } else {
                res.json({ msg: 'La publicación no existe' })
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500);
        }
    }
}