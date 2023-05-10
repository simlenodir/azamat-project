import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { SubCategory } from 'src/entities/sub_category.entity';

@Injectable()
export class SubCategoriesService {
  async foundSubCategory(id: string): Promise<SubCategory> {
    const foundSubCategory = await SubCategory.findOne({
      relations: {category_id: true},
      where: {id}
    })
    if (!foundSubCategory) {
      throw new HttpException('Sub Category not found', HttpStatus.NOT_FOUND);
    }
    return foundSubCategory
  }

  async create(dto: CreateSubCategoryDto): Promise<void> {
    await SubCategory.createQueryBuilder()
    .insert()
    .into(SubCategory)
    .values({
      title: dto.title,
      category_id: dto.category_id as any
    })
    .execute().catch(() => {
      throw new HttpException('Server error', HttpStatus.NOT_FOUND);
    });
  }

  async findAll(): Promise<SubCategory[]> {
    return SubCategory.find({
      relations: {info: true}
    }).catch(() => {
      throw new HttpException('Server error', HttpStatus.NOT_FOUND);
    });
  }



  async findOne(id: string): Promise<SubCategory> {
    return await this.foundSubCategory(id)
  }

  async update(id: string, dto: UpdateSubCategoryDto): Promise<void> {
    const foundSubCategory = await this.foundSubCategory(id)
    await SubCategory.createQueryBuilder()
    .update(SubCategory)
    .set({
      category_id: dto.category_id as unknown,
      title: dto.title
    })
    .where({id})
    .execute().catch(() => {
      throw new HttpException('Server error', HttpStatus.NOT_FOUND);
    });
  }

  async remove(id: string): Promise<void> {
    const foundSubCategory = await this.foundSubCategory(id)
    await SubCategory.delete(id)
  }
}
