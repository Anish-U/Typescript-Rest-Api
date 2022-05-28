import mongoose, { Schema } from 'mongoose';

export enum Gender {
	male = 'male',
	female = 'female',
	other = 'other',
}

export interface Address extends Document {
	street: string;
	city: string;
	postalCode: string;
}

export interface IAuthor extends Document {
	email: string;
	firstName: string;
	lastName: string;
	age: number;
	gender?: Gender;
	Address?: Address;
}

const AuthorSchema: Schema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		gender: {
			type: Object.values(Gender),
		},
		address: {
			street: {
				type: String,
			},
			city: {
				type: String,
			},
			postalCode: {
				type: String,
			},
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IAuthor>('Author', AuthorSchema);
