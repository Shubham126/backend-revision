import mongoose, {Schema, model} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile: {
        type: String,  // cloudinary url
        requiured: true
    },
    thumbnail: {
        type: String,  // cloudinary url
        requiured: true
    },
    title: {
        type: String,  
        requiured: true
    },
    description: {
        type: String,  
        requiured: true
    },
    duration: {
        type: Number,  // cloudinary url
        requiured: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
});

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = model('Video', videoSchema);