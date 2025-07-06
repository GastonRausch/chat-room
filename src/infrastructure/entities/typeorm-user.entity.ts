import { Column, Entity, PrimaryColumn } from 'typeorm';

import { User } from 'src/domain/entities/user';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ name: 'username', unique: true })
  userName: string;

  @Column({ name: 'hash' })
  passwordHashed: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'modified_at', nullable: true })
  modifiedAt: Date;

  toDomainObject() {
    const instance = User.fromData({
      id: this.id,
      userName: this.userName,
      passwordHashed: this.passwordHashed,
      createdAt: this.createdAt,
      modifiedAt: this.modifiedAt,
    });
    return instance;
  }

  static fromDomainObject(user: User): UserEntity {
    const instance = new this();
    instance.id = user.id;
    instance.userName = user.userName;
    instance.createdAt = user.createdAt;
    instance.modifiedAt = user.modifiedAt;
    instance.passwordHashed = user.passwordHashed;

    return instance;
  }
}
