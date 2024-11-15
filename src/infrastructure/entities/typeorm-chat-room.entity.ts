import { IsNotEmpty } from "class-validator";
import { ChatRoom } from "src/core/entities/chat-room.entity";
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

    static toDomainObject(chatRoomEntity: ChatRoomEntity): ChatRoom {
        const chatRoom = new ChatRoom()

        chatRoom.id = chatRoomEntity.id
        chatRoom.name = chatRoomEntity.name
        chatRoom.usersId = chatRoomEntity.usersId

        return chatRoom
    }
}