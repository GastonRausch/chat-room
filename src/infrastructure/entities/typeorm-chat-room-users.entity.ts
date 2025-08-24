import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'chat_room_users' })
export class ChatRoomUsersEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ name: 'chat_room_id' })
  chatRoomId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'joined_at' })
  joinedAt: Date;
}
