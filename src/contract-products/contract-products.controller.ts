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
import { ContractProductsService } from '@contract-products/contract-products.service';
import { CreateContractProductDto } from '@contract-products/dto/create-contract-product.dto';
import { UpdateContractProductDto } from '@contract-products/dto/update-contract-product.dto';
import { ContractProduct } from '@contract-products/domain/contract-product';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '@utils/dto/infinity-pagination-response.dto';
import { QueryContractProductDto } from '@contract-products/dto/query-contract-product.dto';
import { infinityPagination } from '@utils/infinity-pagination';

@ApiBearerAuth()
@ApiTags('ContractProducts')
@Controller({ path: 'contract-products', version: '1' })
export class ContractProductsController {
  constructor(private readonly service: ContractProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ContractProduct })
  create(@Body() dto: CreateContractProductDto): Promise<ContractProduct> {
    return this.service.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: InfinityPaginationResponse(ContractProduct) })
  async findAll(
    @Query() query: QueryContractProductDto,
  ): Promise<InfinityPaginationResponseDto<ContractProduct>> {
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
  @ApiOkResponse({ type: ContractProduct })
  @ApiParam({ name: 'id', type: String, required: true })
  findOne(
    @Param('id') id: ContractProduct['id'],
  ): Promise<ContractProduct | null> {
    return this.service.findById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ContractProduct })
  @ApiParam({ name: 'id', type: String, required: true })
  update(
    @Param('id') id: ContractProduct['id'],
    @Body() dto: UpdateContractProductDto,
  ): Promise<ContractProduct | null> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: String, required: true })
  remove(@Param('id') id: ContractProduct['id']): Promise<void> {
    return this.service.remove(id);
  }
}
