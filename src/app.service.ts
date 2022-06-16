import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Service, serviceT } from './service.entity'
import { Version } from './version.entity'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Service)
    private readonly ServicesRepository: Repository<Service>,
    @InjectRepository(Version)
    private readonly VersionRepository: Repository<Version>,
  ) {}

  async create(newService: serviceT): Promise<void> {
    try{
      await this.ServicesRepository
      .createQueryBuilder('service')
      .insert()
      .values(newService)
      .execute()
    } catch (error) {
      console.log(error)
    }
  }

  async findAll({like='', sortBy='updateDate', limit=12, offset=0}, order: 'ASC' | 'DESC'='DESC'): Promise<Service[]> {
    const query = this.ServicesRepository
      .createQueryBuilder('service')
      .select(['service.id as id', 'service.title as title', 'service.description as description'])
      .leftJoin("service.versions", "version")
      .addSelect("count(version.version_number)", "versionCount")
      .groupBy("service.id")
      .where('service.title like :like or service.description like :like', {like: `%${like}%`})
      .limit(limit)
      .offset(offset)

    switch (sortBy) {
      case 'id':
        query.orderBy('service.' + sortBy, order)
        break
      case 'title':
        query.orderBy('service.' + sortBy, order)
        break
      case 'description':
        query.orderBy('service.' + sortBy, order)
        break
      default:
        query.orderBy('service.updateDate', order)
    }
      
    return await query.getRawMany()
  }

  async findOne(id: number): Promise<Service> {
    return this.ServicesRepository
      .createQueryBuilder('service')
      .select(['service.id', 'service.title', 'service.description', 'service.updateDate'])
      .leftJoinAndSelect("service.versions", "versions")
      .where('service.id = :id', {id: id})
      .getOne()
  }

  async update(id: number, newService: serviceT, version_number: string=null): Promise<void> {
    try{
      await this.ServicesRepository
      .createQueryBuilder('service')
      .update(Service)
      .set({...newService})
      .set({updateDate: new Date()})
      .where('service.id = :id', {id: id})
      .execute()
    } catch (error) {
      console.log(error)
    }

    if (version_number !== null && version_number !== undefined &&  version_number !== '') {
      await this.VersionRepository
        .createQueryBuilder('version')
        .insert()
        .values({service_id: id, version_number: version_number})
        .execute()
    }
  }

  async remove(id: string): Promise<void> {
    try{
      await this.ServicesRepository
        .delete(id)
    } catch (error) {
      console.log(error)
    }
  }
}
