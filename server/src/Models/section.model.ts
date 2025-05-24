import mongoose, { model, Schema } from "mongoose";

export interface ISection extends mongoose.Document {
	_id: mongoose.Schema.Types.ObjectId;
	courseId: mongoose.Schema.Types.ObjectId;
	title: string;
	order: number;
	lessons: mongoose.Schema.Types.ObjectId[];
	createdAt: Date;
}

const SectionSchema = new Schema<ISection>({
	courseId: {
		type: Schema.Types.ObjectId,
		ref: "Course",
		required: true,
	},
	title: { type: String, required: true },
	order: { type: Number },
	lessons: [
		{
			type: Schema.Types.ObjectId,
			ref: "Lesson",
		},
	],
	createdAt: { type: Date, default: Date.now },
});
// SectionSchema.index({ courseId: 1, order: 1 }, { unique: true });

export const Section = model<ISection>("Section", SectionSchema);
