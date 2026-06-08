export class Todo{
    constructor({item, status}){

        if (item === undefined && status === undefined) {
            throw new Error("please enter your todo");
        }
        this.item = item;
        this.status = status;



    }

}