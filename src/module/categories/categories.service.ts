import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from 'src/entities/categories.entity';
import e from 'express';

@Injectable()
export class CategoriesService {
  async foundCategory(id: string): Promise<Category> {
    const foundCategory = Category.findOne({
      where: { id },
      relations: { sub_category: true },
    }).catch(() => {
      throw new HttpException('Server error', HttpStatus.NOT_FOUND);
    });

    if (!foundCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return foundCategory;
  }

  async create(dto: CreateCategoryDto): Promise<void> {
    await Category.createQueryBuilder()
      .insert()
      .into(Category)
      .values({
        title: dto.title,
      })
      .execute()
      .catch(() => {
        throw new HttpException('Club Not Found', HttpStatus.NOT_FOUND);
      });
  }

  async findAll(): Promise<Category[]> {
    return await Category.find().catch(() => {
      throw new HttpException('Server error', HttpStatus.NOT_FOUND);
    });
  }

  async findOne(id: string): Promise<Category> {
    return this.foundCategory(id);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const foundCategory = await this.foundCategory(id);

    await Category.createQueryBuilder()
      .update(Category)
      .set({
        title: updateCategoryDto.title || foundCategory.title,
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException('Server error', HttpStatus.NOT_FOUND);
      });
  }

  async remove(id: string): Promise<void> {
    const foundCategory = await this.foundCategory(id);
    await Category.delete(id).catch(() => {
      throw new HttpException('Server error', HttpStatus.NOT_FOUND);
    });
  }
}
