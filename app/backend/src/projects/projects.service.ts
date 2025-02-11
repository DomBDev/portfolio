import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Project } from '@prisma/client';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    const data: Prisma.ProjectCreateInput = {
      ...dto,
      tags: JSON.stringify(dto.tags || []),
      technologies: JSON.stringify(dto.technologies || []),
      media: JSON.stringify(dto.media || []),
      challenges: JSON.stringify(dto.challenges || []),
      highlights: JSON.stringify(dto.highlights || []),
      metrics: dto.metrics ? JSON.stringify(dto.metrics) : null,
      sections: JSON.stringify(dto.sections || []),
      startDate: dto.startDate ? new Date(dto.startDate) : null,
      endDate: dto.endDate ? new Date(dto.endDate) : null,
    };

    return this.prisma.project.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    featured?: boolean;
    status?: string;
    search?: string;
    startDate?: Date;
    endDate?: Date;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
  }): Promise<{ data: Project[]; total: number }> {
    const { skip, take, featured, status, search, startDate, endDate, orderBy } = params;

    const where: Prisma.ProjectWhereInput = {
      AND: [
        featured !== undefined ? { featured } : {},
        status ? { status } : {},
        search ? {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
          ],
        } : {},
        startDate ? { startDate: { gte: startDate } } : {},
        endDate ? { endDate: { lte: endDate } } : {},
      ],
    };

    const [data, total] = await Promise.all([
      this.prisma.project.findMany({
        skip,
        take,
        where,
        orderBy: orderBy || { order: 'asc' },
      }),
      this.prisma.project.count({ where }),
    ]);

    // Parse JSON strings back to arrays/objects
    const parsedData = data.map(project => ({
      ...project,
      tags: JSON.parse(project.tags),
      technologies: JSON.parse(project.technologies),
      media: JSON.parse(project.media),
      challenges: JSON.parse(project.challenges),
      highlights: JSON.parse(project.highlights),
      metrics: project.metrics ? JSON.parse(project.metrics) : null,
      sections: JSON.parse(project.sections),
    }));

    return { data: parsedData, total };
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Parse JSON strings back to arrays/objects
    return {
      ...project,
      tags: JSON.parse(project.tags),
      technologies: JSON.parse(project.technologies),
      media: JSON.parse(project.media),
      challenges: JSON.parse(project.challenges),
      highlights: JSON.parse(project.highlights),
      metrics: project.metrics ? JSON.parse(project.metrics) : null,
      sections: JSON.parse(project.sections),
    };
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    // Ensure project exists
    await this.findOne(id);

    // Process JSON fields if they exist in the update data
    const data: Prisma.ProjectUpdateInput = {
      ...dto,
      tags: dto.tags ? JSON.stringify(dto.tags) : undefined,
      technologies: dto.technologies ? JSON.stringify(dto.technologies) : undefined,
      media: dto.media ? JSON.stringify(dto.media) : undefined,
      challenges: dto.challenges ? JSON.stringify(dto.challenges) : undefined,
      highlights: dto.highlights ? JSON.stringify(dto.highlights) : undefined,
      metrics: dto.metrics ? JSON.stringify(dto.metrics) : undefined,
      sections: dto.sections ? JSON.stringify(dto.sections) : undefined,
      startDate: dto.startDate ? new Date(dto.startDate) : undefined,
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
    };

    const updated = await this.prisma.project.update({
      where: { id },
      data,
    });

    // Parse JSON strings back to arrays/objects
    return {
      ...updated,
      tags: JSON.parse(updated.tags),
      technologies: JSON.parse(updated.technologies),
      media: JSON.parse(updated.media),
      challenges: JSON.parse(updated.challenges),
      highlights: JSON.parse(updated.highlights),
      metrics: updated.metrics ? JSON.parse(updated.metrics) : null,
      sections: JSON.parse(updated.sections),
    };
  }

  async delete(id: string): Promise<Project> {
    // Ensure project exists
    await this.findOne(id);

    return this.prisma.project.delete({
      where: { id },
    });
  }

  async updateOrder(projectIds: string[]): Promise<void> {
    // Update the order of multiple projects in a transaction
    await this.prisma.$transaction(
      projectIds.map((id, index) =>
        this.prisma.project.update({
          where: { id },
          data: { order: index },
        }),
      ),
    );
  }

  async toggleFeatured(id: string): Promise<Project> {
    const project = await this.findOne(id);
    const updated = await this.prisma.project.update({
      where: { id },
      data: { featured: !project.featured },
    });

    // Parse JSON strings back to arrays/objects
    return {
      ...updated,
      tags: JSON.parse(updated.tags),
      technologies: JSON.parse(updated.technologies),
      media: JSON.parse(updated.media),
      challenges: JSON.parse(updated.challenges),
      highlights: JSON.parse(updated.highlights),
      metrics: updated.metrics ? JSON.parse(updated.metrics) : null,
      sections: JSON.parse(updated.sections),
    };
  }

  async bulkDelete(ids: string[]): Promise<void> {
    await this.prisma.project.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async bulkUpdateStatus(ids: string[], status: string): Promise<void> {
    await this.prisma.project.updateMany({
      where: {
        id: { in: ids },
      },
      data: { status },
    });
  }
}
