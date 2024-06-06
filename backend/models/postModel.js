import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    postBy:{
     type: mongoose.Schema.Types.ObjectId,
     ref:'User',
     require:true
    },
    caption:{
        type:String,
        maxLenght: 500
    },
    img:{
        type:String,
    },
    like:{
        type:Number,
        default:0
    },
    replies:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                require:true
            },
            text:{
                type:String,
                require:true
            },
            userProfilePict:{
                type:String,
            },
            username:{
                type:String
            }
        }
    ]
},{
    timestamps:true
})

const Post = mongoose.modelNames('Post', postSchema)

export default Post