import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, Query, Put } from '@nestjs/common'
import { AppService } from './app.service'
import { Service, serviceT } from './service.entity'

@Controller('services')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(@Query() query): Promise<Service[]> {
    const {like, sortBy, limit, offset, order} = query
    return this.appService.findAll({like, sortBy, limit, offset}, order)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Service> {
    return this.appService.findOne(id)
  }

  @Post()
  create(@Body() newService: serviceT): Promise<number> {
    return this.appService.create(newService)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() newServiceAndVersion: serviceT & {version_number: string}): Promise<void> {
    const {version_number, ...newService} = newServiceAndVersion
    return this.appService.update(id, newService, version_number)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.appService.remove(id)
  }
}
