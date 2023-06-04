import mongoose from "mongoose"

const ticketsCollection = "tickets"

const ticketSchema = new mongoose.Schema({
    code: {type: String, required: true},
    purchase_datetime: {type:Number, required: true},
    amount: {type: Number, required: true},
    purchaser: {type: String, required: true}
})