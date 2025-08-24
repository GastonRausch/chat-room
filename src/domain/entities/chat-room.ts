import { v4 as uuid } from 'uuid';

type Props = {
  id: string;
  name: string;
  isPublic: boolean;
  description: string;
};

type CreateProps = Omit<Props, 'id'>;

export class ChatRoom implements Props {
  readonly id: string;
  readonly name: string;
  readonly isPublic: boolean;
  readonly description: string;

  constructor(data: Props) {
    Object.assign(this, data);
  }

  static create(data: CreateProps): ChatRoom {
    return new ChatRoom({
      id: uuid(),
      name: data.name,
      isPublic: data.isPublic,
      description: data.description,
    });
  }

  public static fromData(data: Props): ChatRoom {
    return new ChatRoom({
      id: data.id,
      isPublic: data.isPublic,
      name: data.name,
      description: data.description,
    })
  }
}
