import { CloudinaryStorage } from "multer-storage-cloudinary";
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const lmsAvatarStorage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "LMS-Avatar",
		allowedFormats: ["jpg", "jpeg", "png"],
		width: 150,
		crop: "scale",
	} as any,
});

const lmsLectureVideoStorage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "LMS-Lectures",
		resource_type: "video",
	} as any,
});

export { lmsAvatarStorage, lmsLectureVideoStorage };
