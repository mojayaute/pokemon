// @/models.ts
import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "pokemons",
})
export class Pokemon extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  pokemon_id?: number; 
}