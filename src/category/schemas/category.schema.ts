import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {

    @Prop({ required: true })
    name: string;

    @Prop({ slug: 'name', unique: true, index: true })
    slug: string;

    @Prop()
    banner: string;

}

export const CategorySchema = SchemaFactory.createForClass(Category);