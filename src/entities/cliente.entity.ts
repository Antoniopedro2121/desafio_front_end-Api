import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Contatos } from "./contatos.entity";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 250 })
  nome_completo: string;

  @Column({ length: 250, unique: true })
  email: string;

  @Column()
  telefone: number;

  @CreateDateColumn()
  date_creation: Date;

  @UpdateDateColumn()
  date_update: Date;

  @OneToMany((type) => Contatos, (contatos) => contatos.cliente, {
    eager: true,
  })
  contatos: Contatos[];
}
