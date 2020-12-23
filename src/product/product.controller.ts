import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dtos/product-dto';
import { PaginateDto } from 'src/common/dtos/paginate-sort-dto';

@Controller('product')
export class ProductController {

    constructor(private readonly catService: ProductService) {}
    
    @Post()
    async create(@Body(new ValidationPipe()) productDto: ProductDto) {
      await this.catService.create(productDto);
    }
  
    @Get()
    async findAll(@Query() paginateSortDto: PaginateDto): Promise<any> {
      console.log('pagin ', paginateSortDto);
      return this.catService.findAll(paginateSortDto);
    }

    @Get('productsByCategory/:category')
    async findAllByCategory(@Param('category') category: string, @Query() paginateSortDto: PaginateDto): Promise<any> {
      console.log('pagin ', paginateSortDto, category);
      return this.catService.findAllByCategory(category, paginateSortDto);
    }

    @Get('productsByCategorySlug/:category')
    async findAllByCategorySlug(@Param('category') category: string, @Query() paginateSortDto: PaginateDto): Promise<any> {
      console.log('pagin ', paginateSortDto, category);
      return this.catService.findAllByCategorySlug(category, paginateSortDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.catService.findOne(id);
    }

    @Get('productBySlug/:slug')
    findOneBySlug(@Param('slug') slug: string) {
      return this.catService.findOneBySlug(slug);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: ProductDto) {
      return this.catService.update(updateCatDto, id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.catService.deleteOne(id);
    }
    
}
