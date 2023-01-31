
const { promises:fs } = require('fs');

function getTimestamp(){
    return (`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()} - ${new Date().toLocaleTimeString('es-AR')}`)
}

function newId(arr, product=false){
    if(product){ 
        arr.sort((a, b) => {return a - b}) 
        product.id = parseInt(arr[arr.length - 1].id) + 1
        return product.id
    }
    return parseInt(arr[arr.length - 1].id) + 1
}

class Container{
    constructor(route){
        this.route = route;
    }
    
    async newCart(){
        let products = [];
        let timestamp = getTimestamp();
        let carts = await this.getAll();
        let id = 1
        if(carts.length > 0){
            id = newId(carts);
        }
        this.saveCart({id, timestamp, products})
        return {id, timestamp, products}
        
    }
    async saveCart(cart){
        let carts = await this.getAll();
        carts.push(cart)
        try {
            await fs.writeFile(this.route, JSON.stringify(carts, null, 2))
        } catch (error) {
            console.log(error)
        }
    }
    async saveCarts(carts){
        try {
            await fs.writeFile(this.route, JSON.stringify(carts, null, 2))
        } catch (error) {
            console.log(error)
        }
    }
    async updateCart(cart){
        let carts = await this.getAll()
        let index = carts.map(element => element.id).indexOf(cart.id)
        carts.splice(index, 1)
        console.log(cart)
        carts.push(cart)
        await this.saveCarts(carts)
        return true

    }
    async addToCart(cartId, product){
        let cart = await this.getById(cartId)
        cart.push(product)
        await this.update(cart)
    }
    async deleteCartProduct(cartId, productId){
        let cart = await this.getById(cartId)
        try {
            if(cart === null){
                throw new Error('Id de carrito no encontrado')
            }
            let newCart = cart.filter(element => element.id =! productId)
            await this.saveCart(newCart)
        } catch (error) {
            console.log('Error de escritura')
            console.log(error)
        }
    }

}

module.exports = Container;