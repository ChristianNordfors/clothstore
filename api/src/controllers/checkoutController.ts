import { Request, Response } from "express"
import mercadoPago from 'mercadopago'
import dotenv from "dotenv";

dotenv.config()

const { MERCADOPAGO_API_PROD_ACCESS_TOKEN } = process.env

declare namespace process.env {
    const MERCADOPAGO_API_PROD_ACCESS_TOKEN: string;
}


mercadoPago.configure({
    access_token: 'APP_USR-3457427128052750-120215-cdbb5e0a88b281ea5edd53c4c0498629-1031300730'
})

// let preference = {
//     items: [
//         {
// title: 'Mi producto',
// unit_price: 100,
// quantity: 1
//         }
//     ]
// }

export default class Checkout {
    static async postCheckout(req: Request, res: Response) {

        const order = req.body;

        try {

            let orderMap = order.map((c: any) => {
                return {
                    title: c.title,
                    unit_price: c.price,
                    quantity: c.quantity
                }
            })

            const preference = {
                items: orderMap,
                marketplace: 'Mi negocio',
                additional_info: "AAAAAAAAAAAAAAAAAAAAAAAAAAA",
                statement_descriptor: "Keilo's shop",
                back_urls: { failure: '', pending: '', success: 'http://localhost:3000/' }
            }

            const response = await mercadoPago.preferences.create(preference)

            console.log(response.body)

            res.json(response.body.init_point)


        } catch (error) {
            console.log(error)
        }

    }
}