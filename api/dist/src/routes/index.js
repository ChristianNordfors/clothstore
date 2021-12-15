"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users = require("./users");
const publications = require("./publications");
const cloudinary = require("./cloudinary");
const reviews = require("./review");
const qAndAs = require("./qAndA");
const mercadoPago = require("./checkout");
const carrito = require("./carrito");
const denunciation = require("./denunciation");
const discount = require("./discount");
const autocomplete = require("./autocomplete");
module.exports = {
    router,
    users,
    publications,
    cloudinary,
    reviews,
    qAndAs,
    mercadoPago,
    carrito,
    discount,
    denunciation,
    autocomplete
};
