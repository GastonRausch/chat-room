export class ChatRoom {
    id: string;
    name: string;
    usersId: string[];
    
    constructor() {}

    public static create(id: string, name: string, usersId: string[]){
        const instance = new this();
        instance.id = id;
        instance.name = name;
        instance.usersId = usersId;
        return instance
    }

    public static fromData(data: any){
        const instance = new this();
        instance.id = data.id;
        instance.name = data.name;
        instance.usersId = data.usersId;
        return instance
    }

    addUser(userId: string) {
        this.usersId.push(userId);
    }
}
