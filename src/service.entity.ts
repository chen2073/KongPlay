import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { Version } from './version.entity'

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar', { length: 50, unique: true, nullable: false })
    title: string

    @Column('varchar', { length: 500, default: '' })
    description: string

    @UpdateDateColumn()
    updateDate: Date

    @CreateDateColumn()
    createDate: Date

    @OneToMany(() => Version, (version) => version.services, { cascade: true })
    versions: Version[]
}

export type serviceT = {
  title: string;
  description?: string;
}