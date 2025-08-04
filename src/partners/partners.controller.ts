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
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PartnersService } from '@partners/partners.service';
import { CreatePartnerDto } from '@partners/dto/create-partner.dto';
import { UpdatePartnerDto } from '@partners/dto/update-partner.dto';
import { Partner } from '@partners/domain/partner';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '@utils/dto/infinity-pagination-response.dto';
import { QueryPartnerDto } from '@partners/dto/query-partner.dto';
import { infinityPagination } from '@utils/infinity-pagination';

@ApiBearerAuth()
@ApiTags('Partners')
@Controller({ path: 'partners', version: '1' })
export class PartnersController {
  constructor(private readonly service: PartnersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Partner })
  create(@Body() dto: CreatePartnerDto): Promise<Partner> {
    return this.service.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: InfinityPaginationResponse(Partner) })
  async findAll(
    @Query() query: QueryPartnerDto,
  ): Promise<InfinityPaginationResponseDto<Partner>> {
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
  @ApiOkResponse({ type: Partner })
  @ApiParam({ name: 'id', type: String, required: true })
  findOne(@Param('id') id: Partner['id']): Promise<Partner | null> {
    return this.service.findById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Partner })
  @ApiParam({ name: 'id', type: String, required: true })
  update(
    @Param('id') id: Partner['id'],
    @Body() dto: UpdatePartnerDto,
  ): Promise<Partner | null> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: String, required: true })
  remove(@Param('id') id: Partner['id']): Promise<void> {
    return this.service.remove(id);
  }
}
