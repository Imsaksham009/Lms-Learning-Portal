import mongoose, { Document, model, ObjectId, Schema } from "mongoose";

export interface ICourse extends Document {
	title: string;
	slug: string;
	description: string;
	thumbnail: string;
	level: string;
	instructorId: mongoose.Schema.Types.ObjectId;
	price: number;
	duration: number; // total duration in minutes
	tags: string[];
	category: string;
	sections: mongoose.Schema.Types.ObjectId[];
	enrolledStudents: number;
	ratings: {
		average: number;
		count: number;
	};
	createdAt: Date;
	updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
	{
		title: {
			type: String,
			trim: true,
			required: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
			// required: true,
		},
		level: {
			type: String,
			enum: {
				values: ["beginner", "intermediate", "advanced"],
			},
			required: true,
		},
		instructorId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		duration: {
			type: Number,
			default: 0,
		},
		tags: [{ type: String }],
		category: {
			type: String,
			required: true,
		},
		sections: [
			{
				type: Schema.Types.ObjectId,
				ref: "Section",
			},
		],
		enrolledStudents: {
			type: Number,
			default: 0,
		},
		ratings: {
			average: { type: Number, default: 0 },
			count: { type: Number, default: 0 },
		},
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

export const Course = model<ICourse>("Course", CourseSchema);
