import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { ProductDto } from './dtos/product-dto';
import { PaginateDto } from 'src/common/dtos/paginate-sort-dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {

    constructor(@InjectModel(Product.name) private prodModel: Model<ProductDocument>, private catServ: CategoryService) { }

    async create(productDto: ProductDto): Promise<Product> {
        const createdCat = new this.prodModel(productDto);
        return createdCat.save();
    }

    async update(productDto: ProductDto, id: string): Promise<Product> {
        return this.prodModel.findByIdAndUpdate(id, { ...productDto }, { useFindAndModify: false }).exec();
    }

    async findAll(paginateDto: PaginateDto): Promise<any> {
        const count:number = await this.prodModel.countDocuments().exec();
        const docs: Product[] = await this.prodModel.find().skip(paginateDto.skip).limit(paginateDto.limit).sort({ [paginateDto.sortBy]: paginateDto.sortOrder }).exec();
        return { count, docs };
    }

    async findAllByCategory(category: any, paginateDto: PaginateDto): Promise<any> {
        const count:number = await this.prodModel.countDocuments({category}).exec();
        const docs: Product[] = await this.prodModel.find({category}).skip(paginateDto.skip).limit(paginateDto.limit).sort({ [paginateDto.sortBy]: paginateDto.sortOrder }).exec();
        return { count, docs };
    }

    async findAllByCategorySlug(category: any, paginateDto: PaginateDto): Promise<any> {
        const cat:any = await this.catServ.findOneBySlug(category);
        const count:number = await this.prodModel.countDocuments({category: cat._id}).exec();
        const docs: Product[] = await this.prodModel.find({category: cat._id}).skip(paginateDto.skip).limit(paginateDto.limit).sort({ [paginateDto.sortBy]: paginateDto.sortOrder }).exec();
        return { count, docs };
    }

    async findOne(id: string): Promise<Product> {
        return this.prodModel.findById(id).exec();
    }

    async findOneBySlug(slug: string): Promise<Product> {
        return this.prodModel.findOne({ slug }).exec();
    }

    async deleteOne(id: string): Promise<Product> {
        return this.prodModel.deleteOne({ _id: id }).exec();
    }

}
