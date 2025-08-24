export class UserNotFoundException extends Error {
  constructor(userName: string) {
    super(`User with username "${userName}" not found`);
    this.name = 'UserNotFoundException';
  }
}
