export class User {
    id: string;
    username: string;
    passwordHashed: string;
    status: string;

    constructor(id: string, username: string, passwordHashed: string, status: string = 'offline') {
        this.id = id;
        this.username = username;
        this.passwordHashed = passwordHashed;
        this.status = status;
    }

}
