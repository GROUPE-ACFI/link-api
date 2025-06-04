import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OpportunitiesService } from '@opportunities/opportunities.service';
import { CreateOpportunityDto } from '@opportunities/dto/create-opportunity.dto';
import { UpdateOpportunityDto } from '@opportunities/dto/update-opportunity.dto';
import { Opportunity } from '@opportunities/domain/opportunity';
import { QueryOpportunityDto } from '@opportunities/dto/query-opportunity.dto';

@ApiBearerAuth()
@ApiTags('Opportunities')
@Controller({ path: 'opportunities', version: '1' })
export class OpportunitiesController {
  constructor(private readonly service: OpportunitiesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Opportunity })
  create(@Body() dto: CreateOpportunityDto): Promise<Opportunity> {
    return this.service.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [Opportunity] })
  async findAll(
    @Query() query: QueryOpportunityDto,
  ): Promise<{ data: Opportunity[]; total: number }> {
    const [data, total] = await this.service.findAll(query);
    return { data, total };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Opportunity })
  @ApiParam({ name: 'id', type: String, required: true })
  findOne(@Param('id') id: Opportunity['id']): Promise<Opportunity | null> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Opportunity })
  @ApiParam({ name: 'id', type: String, required: true })
  update(
    @Param('id') id: Opportunity['id'],
    @Body() dto: UpdateOpportunityDto,
  ): Promise<Opportunity | null> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: String, required: true })
  remove(@Param('id') id: Opportunity['id']): Promise<void> {
    return this.service.remove(id);
  }
}
