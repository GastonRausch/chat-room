import { User } from "src/core/entities/user";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryColumn({type:'varchar'})
    id: string = v4();

    @Column()
    userName: string;

    @Column()
    passwordHashed: string;

    toDomainObject(){
        const instance = User.fromData(this)
        return instance
    }
}