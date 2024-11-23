import { User } from "src/core/entities/user";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryColumn({type:'varchar'})
    id: string;

    @Column()
    userName: string;

    @Column()
    passwordHashed: string;

    toDomainObject(){
        const instance = User.fromData({
            id: this.id,
            userName: this.userName,
            passwordHashed: this.passwordHashed,
        })
        return instance
    }
}