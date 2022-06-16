import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Service } from './service.entity'
import { Version } from './version.entity'


describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          "type": "sqlite",
          "database": "./test.db",
          "synchronize": true,
          "logging": true,
          "autoLoadEntities": true
        }),
        TypeOrmModule.forFeature([Service, Version])
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
    appService = app.get<AppService>(AppService)
  })

  describe('addNewService', () => {
    it('create a new service', async () => {
      const result = 1
      jest.spyOn(appService, 'create').mockImplementation(async () => result);

      expect(await appController
        .create({title: 'testTitle', description: 'test description'})
      ).toBe(result);
    })
  })

})
