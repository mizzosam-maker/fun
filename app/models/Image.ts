// import mongoose from 'mongoose';

// const ImageSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   cloudinaryUrl: {
//     type: String,
//     required: true,
//   },
//   cloudinaryPublicId: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.models.Image || mongoose.model('Image', ImageSchema);

// app/models/Image.ts
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  userId: {
    type: String, // Changed from ObjectId to String
    required: true,
  },
  cloudinaryUrl: {
    type: String,
    required: true,
  },
  cloudinaryPublicId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);