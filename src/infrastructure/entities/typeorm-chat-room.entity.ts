import { IsNotEmpty } from "class-validator";
import { ChatRoom } from "src/core/entities/chat-room";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

@Entity({name: 'chat-room'})
export class ChatRoomEntity {
    @PrimaryColumn({type:'varchar'})
    id: string;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column("varchar", { array: true, nullable: true })
    usersId: string[];

    static toDomainObject(chatRoomEntity: ChatRoomEntity): ChatRoom {
        const chatRoom = new ChatRoom()

        chatRoom.id = chatRoomEntity.id
        chatRoom.name = chatRoomEntity.name
        chatRoom.usersId = chatRoomEntity.usersId

        return chatRoom
    }
}