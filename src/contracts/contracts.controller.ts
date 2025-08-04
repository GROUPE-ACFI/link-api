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
import { ContractsService } from '@contracts/contracts.service';
import { CreateContractDto } from '@contracts/dto/create-contract.dto';
import { UpdateContractDto } from '@contracts/dto/update-contract.dto';
import { Contract } from '@contracts/domain/contract';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '@utils/dto/infinity-pagination-response.dto';
import { QueryContractDto } from '@contracts/dto/query-contract.dto';
import { infinityPagination } from '@utils/infinity-pagination';

@ApiBearerAuth()
@ApiTags('Contracts')
@Controller({ path: 'contracts', version: '1' })
export class ContractsController {
  constructor(private readonly service: ContractsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Contract })
  create(@Body() dto: CreateContractDto): Promise<Contract> {
    return this.service.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: InfinityPaginationResponse(Contract) })
  async findAll(
    @Query() query: QueryContractDto,
  ): Promise<InfinityPaginationResponseDto<Contract>> {
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
  @ApiOkResponse({ type: Contract })
  @ApiParam({ name: 'id', type: String, required: true })
  findOne(@Param('id') id: Contract['id']): Promise<Contract | null> {
    return this.service.findById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Contract })
  @ApiParam({ name: 'id', type: String, required: true })
  update(
    @Param('id') id: Contract['id'],
    @Body() dto: UpdateContractDto,
  ): Promise<Contract | null> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: String, required: true })
  remove(@Param('id') id: Contract['id']): Promise<void> {
    return this.service.remove(id);
  }
}
