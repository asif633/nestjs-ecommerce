import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nestjs-ecommerce', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    bufferMaxEntries: 0,
    bufferCommands: false
  }), CategoryModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
