import { Message } from "src/core/entities/message.entity";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 } from 'uuid';

@Entity()
export class MessageEntity{
    @PrimaryColumn({type:'varchar'})
    id: string = v4();

    @Column()
    senderId: string;

    @Column()
    chatRoomId: string;

    @Column()
    content: string;

    @Column({type:'bigint'})
    timestamp: number;

    static fromMessage(message: Message){
        const messageEntity = new MessageEntity()
        messageEntity.chatRoomId = message.chatRoomId
        messageEntity.content = message.content
        messageEntity.id = message.id
        messageEntity.senderId = message.senderId
        messageEntity.timestamp = message.timestamp
        return messageEntity
    }
}