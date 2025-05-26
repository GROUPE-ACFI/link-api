import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './domain/company';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { QueryCompanyDto } from './dto/query-company.dto';
import { infinityPagination } from '../utils/infinity-pagination';

@ApiBearerAuth()
@ApiTags('Companies')
@Controller({ path: 'companies', version: '1' })
export class CompaniesController {
  constructor(private readonly service: CompaniesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Company })
  create(@Body() dto: CreateCompanyDto): Promise<Company> {
    return this.service.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: InfinityPaginationResponse(Company) })
  async findAll(
    @Query() query: QueryCompanyDto,
  ): Promise<InfinityPaginationResponseDto<Company>> {
    const page = query.page ?? 1;
    let limit = query.limit ?? 10;
    if (limit > 50) limit = 50;
    return infinityPagination(
      await this.service.findManyWithPagination({
        paginationOptions: { page, limit },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Company })
  @ApiParam({ name: 'id', type: String, required: true })
  findOne(@Param('id') id: Company['id']): Promise<Company | null> {
    return this.service.findById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Company })
  @ApiParam({ name: 'id', type: String, required: true })
  update(
    @Param('id') id: Company['id'],
    @Body() dto: UpdateCompanyDto,
  ): Promise<Company | null> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: String, required: true })
  remove(@Param('id') id: Company['id']): Promise<void> {
    return this.service.remove(id);
  }
}
