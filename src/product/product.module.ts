import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: Product.name,
    useFactory: () => {
      const schema = ProductSchema;
      schema.plugin(require('mongoose-paginate-v2'));
      schema.plugin(require('mongoose-slug-generator'));
      return schema;
    },
  }]), CategoryModule],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
