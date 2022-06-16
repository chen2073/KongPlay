import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Service } from './service.entity'
import { Version } from './version.entity'


@Module({
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
})
export class AppModule {}
