export class Todo{
    constructor({item, status}){
        if (item === null && status === null) {
            throw new Error("please enter your todo");
        }



        this.item = item
        this.status = status



    }

}