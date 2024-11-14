import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

@Entity()
export class ChatRoomEntity {
    @PrimaryColumn({type:'varchar'})
    id: string = v4();

    @Column()
    @IsNotEmpty()
    name: string;

    @Column("varchar", { array: true })
    usersId: string[];
}