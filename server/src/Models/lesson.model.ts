import mongoose, { model, Schema } from "mongoose";

export interface ILesson extends mongoose.Document {
	_id: mongoose.Schema.Types.ObjectId;
	courseId: mongoose.Schema.Types.ObjectId;
	sectionId: mongoose.Schema.Types.ObjectId;
	title: string;
	description: string;
	videoUrl?: string;
	duration: number;
	order: number;
	createdAt: Date;
}
const LessonSchema = new Schema<ILesson>({
	courseId: {
		type: Schema.Types.ObjectId,
		ref: "Course",
		required: true,
	},
	sectionId: {
		type: Schema.Types.ObjectId,
		ref: "Section",
		required: true,
	},
	title: { type: String, required: true },
	description: { type: String, required: true },
	videoUrl: { type: String },
	duration: { type: Number, required: true },
	order: { type: Number },
	createdAt: { type: Date, default: Date.now },
});

export const Lesson = model<ILesson>("Lesson", LessonSchema);
