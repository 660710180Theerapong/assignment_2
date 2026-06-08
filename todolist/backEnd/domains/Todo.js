export class Todo{
    constructor({item, status}){
        console.log("Item: ", item)
        console.log("Status: ", status)
        if (item === undefined && status === undefined) {
            throw new Error("please enter your todo");
        }
        this.item = item;
        this.status = status;



    }

}