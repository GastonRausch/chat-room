import { User } from "src/core/entities/user";
import { UserResponseDTO } from "../dto/user-response.dto";

export class UserMapper {
  static toDTO(user: User): UserResponseDTO {
    return new UserResponseDTO(user.id, user.userName, user.createdAt);
  }
}