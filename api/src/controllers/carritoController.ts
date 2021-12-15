import { Request, Response } from "express"
import UserSchema, { User } from "../models/user";
import carritoSchema, { Carrito } from '../models/carrito';
import PublicationSchema from '../models/publication';
import { FilterQuery } from "mongoose";



export default class CarritoController {
    static async postCarrito(req: Request, res: Response) {
        try {

            const carrito = req.body
            const { _id } = req.params

            const carritoBuscado: Carrito | null = await carritoSchema.findOne({ userId: _id } as FilterQuery<Carrito>)

            if (carritoBuscado) {
                let length = carritoBuscado?.publications?.length;

                if (length === 0) {
                    carrito.forEach(async (p: any) => {
                        // const public = 
                        carritoBuscado.publications.push({
                            publication: p.id,
                            price: p.price,
                            quantity: p.quantity,
                            title: p.title,
                            image: p.image,
                            discount: p?.discount
                        })
                    })
                }

                carrito.forEach((c: any) => {

                    for (let i = 0; i < length; i++) {
                        if (carritoBuscado?.publications[i]?.publication?.equals(c.id)) {
                            carritoBuscado.publications[i].quantity += parseInt(c.quantity);
                        } else {
                            if (!carritoBuscado.publications.find(p => p.publication.equals(c.id)))
                                carritoBuscado?.publications?.push({
                                    publication: c.id,
                                    price: c.price,
                                    quantity: c.quantity,
                                    title: c.title,
                                    image: c.image,
                                    discount: c?.discount
                                })
                        }

                    }
                })
                carritoBuscado.markModified('publications')
                await carritoBuscado.save()

                res.sendStatus(200);
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async getCarrito(req: Request, res: Response) {
        try {
            const { email } = req.params;
            const user = await UserSchema.findOne({ email })
            let carritoBuscado: Carrito | null = await carritoSchema.findOne({ userId: user?._id });

            let change = false;

            if (carritoBuscado) {

                for (let index = 0; index < carritoBuscado?.publications?.length; index++) {
                    const publicationStock = await PublicationSchema.findById(carritoBuscado?.publications[index].publication);
                    if (publicationStock) {
                        if (carritoBuscado?.publications[index].quantity > publicationStock.stock) {
                            change = true;
                            carritoBuscado.publications[index].quantity = publicationStock.stock;
                        }
                    }
                }

                if (change) {
                    carritoBuscado.markModified('publications')
                    await carritoBuscado.save()
                }


            }



            return res.json(carritoBuscado);
        } catch (error) {
            console.error(error);
            return res.sendStatus(404);
        }
    }

    static async putCarritoAmount(req: Request, res: Response) {
        let nuevo: boolean = false;
        try {
            const { id, email, amount } = req.params
            const user = await UserSchema.findOne({ "email": `${email}` })
            const findPublic = await PublicationSchema.findById(id).populate('discount')

            const carritoBuscado: any = await carritoSchema.findOne({ userId: user?._id })
            const publicationSearched = carritoBuscado?.publications?.find((p: any) => {
                if (p?.publication.equals(id)) {
                    if (p?.quantity + parseInt(amount) < findPublic?.stock) {
                        p.quantity = p.quantity + parseInt(amount);
                    } else if (p?.quantity + parseInt(amount) >= findPublic?.stock) {
                        p.quantity = findPublic?.stock;
                    }
                    nuevo = false;
                    return p;
                } else {
                    nuevo = true;
                }
            })

            if (!publicationSearched) {

                if (findPublic) {
                    carritoBuscado?.publications?.push({
                        publication: findPublic._id,
                        quantity: parseInt(amount),
                        title: findPublic?.name,
                        image: findPublic?.images[0].url,
                        price: findPublic.discount ? findPublic.price - findPublic.price * findPublic.discount.percentage / 100 : findPublic.price,
                        discount: findPublic?.discount?.percentage
                    });
                }
            }

            carritoBuscado.markModified('publications')
            await carritoBuscado.save()

            res.status(200).json(carritoBuscado);
        } catch (error) {
            console.error(error);
        }
    }

    static async putCarrito(req: Request, res: Response) {
        let nuevo: boolean = false;
        try {

            const { id, email } = req.params

            const user = await UserSchema.findOne({ "email": `${email}` })

            const carritoBuscado: any = await carritoSchema.findOne({ userId: user?._id })
            const findPublic = await PublicationSchema.findById(id).populate('discount');

            if (findPublic.stock < 1) return res.json({ msg: 'No hay stock' })

            const publicationSearched = carritoBuscado?.publications?.find((p: any) => {
                if (p?.publication.equals(id)) {
                    if (p?.quantity < findPublic.stock) {
                        p.quantity++
                    }
                    nuevo = false;
                    return p;
                } else {
                    nuevo = true;
                }
            })

            if (!publicationSearched) {

                if (findPublic) {
                    carritoBuscado?.publications?.push({
                        publication: findPublic._id,
                        quantity: 1,
                        title: findPublic?.name,
                        image: findPublic?.images[0].url,
                        price: findPublic.discount ? findPublic.price - findPublic.price * findPublic.discount.percentage / 100 : findPublic.price,
                        discount: findPublic?.discount?.percentage
                    });
                }

            }

            carritoBuscado.markModified('publications')
            await carritoBuscado.save()

            res.status(200).json(carritoBuscado);
        } catch (error) {
            console.error(error);
        }
    }
    static async putCarritoRemove(req: Request, res: Response) {
        let nuevo: boolean = false;
        try {

            const { id, email } = req.params

            const user = await UserSchema.findOne({ email })

            const carritoBuscado: any = await carritoSchema.findOne({ userId: user?._id })

            const publicationSearched = carritoBuscado?.publications?.find((p: any) => {
                if (p?.publication.equals(id)) {
                    if (p.quantity < 2) {
                        carritoBuscado.publications = carritoBuscado?.publications.filter((publicationDelete: any) => publicationDelete.publication !== p.publication);
                        return;
                    };
                    p.quantity--
                    nuevo = false;
                    return p;
                }
            })

            carritoBuscado?.markModified('publications')
            await carritoBuscado.save()

            res.status(200).json(carritoBuscado);
        } catch (error) {
            console.error(error);
        }
    }
}