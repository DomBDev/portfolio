import { IsString, IsOptional, IsBoolean, IsInt, IsArray, IsUrl, IsDateString, ValidateNested, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';

export class CreateProjectDto implements Omit<Prisma.ProjectCreateInput, 'tags' | 'technologies' | 'media' | 'challenges' | 'highlights' | 'sections' | 'metrics'> {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  description: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsUrl()
  @IsOptional()
  demoUrl?: string;

  @IsUrl()
  @IsOptional()
  githubUrl?: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsArray()
  @IsString({ each: true })
  technologies: string[];

  @IsArray()
  media: any[];

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsInt()
  @IsOptional()
  @Min(0)
  order?: number;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  teamSize?: number;

  @IsArray()
  challenges: string[];

  @IsArray()
  highlights: string[];

  @IsOptional()
  metrics?: any;

  @IsArray()
  sections: any[];
}

export class UpdateProjectDto implements Partial<CreateProjectDto> {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];

  @IsOptional()
  @IsArray()
  challenges?: string[];

  @IsOptional()
  @IsArray()
  highlights?: string[];

  @IsOptional()
  @IsArray()
  sections?: any[];

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsUrl()
  demoUrl?: string;

  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @IsArray()
  media?: any[];

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  teamSize?: number;

  @IsOptional()
  metrics?: any;
}

export class UpdateProjectOrderDto {
  @IsArray()
  @IsString({ each: true })
  projectIds: string[];
}

export class BulkActionDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  ids: string[];
}

export class BulkUpdateStatusDto extends BulkActionDto {
  @IsString()
  @IsNotEmpty()
  status: string;
} 