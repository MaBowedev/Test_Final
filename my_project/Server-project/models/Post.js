import mongoose from "mongoose";
const {Schema , model} = mongoose;


const PostSchema = new Schema({
    title: String,
    genre: String,
    summary:String,
    content:String,
    cover:String,
    author:{type:Schema.Types.ObjectId, ref:'User'}
    
}, {
    timestamps: true,
});


export const PostModel =model('post', PostSchema)
