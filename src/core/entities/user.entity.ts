export class User {
    id: string;
    username: string;
    passwordHash: string;
    status: string;

    constructor(id: string, username: string, passwordHash: string, status: string = 'offline') {
        this.id = id;
        this.username = username;
        this.passwordHash = passwordHash;
        this.status = status;
    }

}
