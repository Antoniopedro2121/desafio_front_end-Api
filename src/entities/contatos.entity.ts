import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { Cliente } from "./cliente.entity";

@Entity()
export class Contatos {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 250 })
  nome_completo: string;

  @Column({ length: 250, unique: true })
  email: string;

  @Column({ length: 250, nullable: true })
  apelido: string;

  @Column()
  telefone: number;

  @CreateDateColumn()
  date_creation: Date;

  @UpdateDateColumn()
  date_update: Date;

  @ManyToOne((type) => Cliente, (cliente) => cliente.contatos)
  cliente: Cliente;
}
