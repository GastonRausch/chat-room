import { User } from 'src/domain/entities/user';
import { UserResponseDTO } from '../dto/responses/user-response.dto';

export class UserMapper {
  static toDTO(user: User): UserResponseDTO {
    return new UserResponseDTO(user.id, user.userName, user.createdAt);
  }
}
