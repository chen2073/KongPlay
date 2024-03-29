import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  ManyToOne
} from 'typeorm'
import { Service } from './service.entity'

@Entity()
export class Version {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar', { length: 50, unique: true, nullable: false })
    version_number: string

    @CreateDateColumn()
    createDate: Date

    @ManyToOne(() => Service, (service) => service.versions, { onDelete: 'CASCADE' })
    services: Service

    @Column("int", { nullable: false })
    servicesId: number
}