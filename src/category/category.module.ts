import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategorySchema } from './schemas/category.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: Category.name,
    useFactory: () => {
      const schema = CategorySchema;
      schema.plugin(require('mongoose-slug-generator'));
      return schema;
    },
  }])],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {

}
