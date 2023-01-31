import filesystemCart from "./filesystem/contenedorCart.js";
import filesystemProducts from "./filesystem/contenedor.js";
import MongoCarts from "./mongodb/contenedorCart.js";
import MongoProducts from "./mongodb/contenedor.js";

export default function setDB(){
    const option = process.env.DB
    switch (option) {
        case 'mongodb':
            return {products : new MongoProducts, carts : new MongoCarts}
        case 'filesystem':
            return {products : new filesystemProducts, carts : new filesystemCart} 
        default:
            return false;
    }
}