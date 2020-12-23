import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { Category } from './schemas/category.schema';
import { CategoryService } from './category.service';
import { CategoryDto } from './dtos/category-dto';

@Controller('category')
export class CategoryController {

    constructor(private readonly catService: CategoryService) {}
    
    @Post()
    async create(@Body(new ValidationPipe()) categoryDto: CategoryDto) {
      await this.catService.create(categoryDto);
    }
  
    @Get()
    async findAll(): Promise<Category[]> {
      return this.catService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.catService.findOne(id);
    }

    @Get('categorybySlug/:slug')
    findOneBySlug(@Param('slug') slug: string) {
      return this.catService.findOneBySlug(slug);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: CategoryDto) {
      return this.catService.update(updateCatDto, id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.catService.deleteOne(id);
    }
    
}
