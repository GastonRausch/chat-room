import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";


@Entity()
export class UserEntity {
    @PrimaryColumn({type:'varchar'})
    id: string = v4();

    @Column()
    userName: string;

    @Column()
    passwordHashed: string;
}