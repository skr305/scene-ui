import { Entity, PrimaryColumn, Column } from "typeorm";
@Entity( "User" )
export default class User {
    @PrimaryColumn()
    ID: string = "";
    @Column()
    name: string = "";
}