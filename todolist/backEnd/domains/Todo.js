export class Todo{
    constructor({title, item, status}){
        if (item === undefined && status === undefined) {
            throw new Error("please enter your todo");
        }
        this.title = title; 
        this.item = item;
        this.status = status;



    }

}