import config from '../../utilities/config.js';
import mongoose from 'mongoose'

try {
    await mongoose.connect(config.mongodb.connection, config.mongodb.options)
    console.log('Mongodb Atlas connected.')
} catch (error) {
    console.log('Not connected to Mongodb Atlas.')
    console.log(error)
}

class MongoContainer{
    constructor(collectionName, schema){
        this.collection = mongoose.model(collectionName, schema)
    }
    async getAll(){
        let response = await this.collection.find({})
        return response
    }
    async getById(id){
        let response = await this.collection.find({_id : id})
        return response
    }
    async deleteById(id){
        try {
            await this.collection.deleteOne({_id : id})
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
export default MongoContainer



