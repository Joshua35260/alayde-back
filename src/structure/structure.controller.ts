import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { StructureService } from './structure.service';
import { CreateStructureDto } from './dto/create-structure.dto';
import { UpdateStructureDto } from './dto/update-structure.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { StructureEntity } from './entities/structure.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Controller('structure')
@ApiTags('structure')
export class StructureController {
  constructor(private readonly structureService: StructureService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: StructureEntity })
  create(@Body() createStructureDto: CreateStructureDto) {
    return this.structureService.create(createStructureDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: StructureEntity, isArray: true })
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Number of the page',
    example: '1',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: String,
    description: 'Number of items per page',
    example: '20',
  })
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize?: number, // Pass them to the service, With this setup, you can call the endpoint with optional query parameters like this: sql GET /user?page=2&pageSize=10
  ) {
    const pagination: PaginationDto = {
      page: page || 1, // Default to 1 if not provided
      pageSize: pageSize || 20, // Default to 20 if not provided
    };
    return this.structureService.findAll(pagination);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: StructureEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.structureService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: StructureEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStructureDto: UpdateStructureDto,
  ) {
    return this.structureService.update(+id, updateStructureDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: StructureEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.structureService.remove(+id);
  }
}
