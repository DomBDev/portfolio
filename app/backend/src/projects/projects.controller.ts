import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  ParseArrayPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto, UpdateProjectOrderDto, BulkActionDto } from './dto/project.dto';
import { Project } from '@prisma/client';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('featured') featured?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('orderBy') orderBy?: string,
  ): Promise<{ data: Project[]; total: number }> {
    return this.projectsService.findAll({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      featured: featured ? featured === 'true' : undefined,
      status,
      search,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.projectsService.delete(id);
  }

  @Put('order/update')
  async updateOrder(@Body() updateOrderDto: UpdateProjectOrderDto): Promise<void> {
    await this.projectsService.updateOrder(updateOrderDto.projectIds);
  }

  @Put(':id/toggle-featured')
  async toggleFeatured(@Param('id') id: string): Promise<Project> {
    return this.projectsService.toggleFeatured(id);
  }

  @Post('bulk/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async bulkDelete(@Body() bulkActionDto: BulkActionDto): Promise<void> {
    await this.projectsService.bulkDelete(bulkActionDto.ids);
  }

  @Put('bulk/status')
  @HttpCode(HttpStatus.NO_CONTENT)
  async bulkUpdateStatus(
    @Body() bulkActionDto: BulkActionDto & { status: string },
  ): Promise<void> {
    await this.projectsService.bulkUpdateStatus(bulkActionDto.ids, bulkActionDto.status);
  }
}
