import { User } from 'src/domain/entities/user';
import { UserDataDTO } from '../../../../application/dto/user-data.dto';

export class UserMapper {
  static toDTO(user: User): UserDataDTO {
    return new UserDataDTO(user.id, user.userName, user.createdAt);
  }
}
