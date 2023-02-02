// PRUEBAAAAAAA
import Router from 'express'
import path from 'path';

// let path = require("path")
// let { Router } = require('express');
let router = new Router();


import { addCart, deleteCart, getProducts, addProductToCart, deleteProduct } from "../../dao/filesystem/contenedorCart.js"; // agregado nuevo

// PRUEBAAA
import Contenedor from '../../dao/filesystem/contenedor.js';

// const Contenedor = require('../../dao/filesystem/contenedor.js');
// const productos = new Contenedor(path.join(__dirname, "../../data/productos.json"));
const productos = new Contenedor(path.join("../../data/productos.json"));
// const productos = new Contenedor("../../data/productos.json");

// PRUEBAAA
export default app => {

    // module.exports = app => {

    app.use('/', router);

    router.get('/', (req, res, next) => {
        res.render('inicio', {})
    });

    router.get('/productos', async (req, res, next) => {
        const prod = await productos.getAll();
        res.render('productos', { prod })
    });

    router.post('/productos', async (req, res, next) => {
        let prod = req.body
        await productos.save(prod)
        res.redirect('/')
    });

    router.get('/chat', async (req, res, next) => {
        res.render('chat', {})
    })



    // AGREGADO NUEVO


    //Add a cart
    router.post('/cart', (req, res) => addCart(req, res));

    //Delete cart
    router.delete('/cart/:id', (req, res) => deleteCart(req, res));

    //Get products form an specific cart
    router.get('/cart/:id/products', (req, res) => getProducts(req, res));

    //Add a product to a cart
    router.post('/cart/:id/products', (req, res) => addProductToCart(req, res));

    //Delete a product from a cart
    router.delete('/cart/:id/products/:id_prod', (req, res) => deleteProduct(req, res));
};
