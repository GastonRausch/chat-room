export class UserAlreadyExistException extends Error {
    constructor(userName: string) {
      super(`User with username "${userName}" already exist`);
      this.name = 'UserAlreadyExist';
    }
  }