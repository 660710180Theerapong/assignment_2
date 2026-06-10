export class Todo{
    constructor({title, item, status}){
        if (status === undefined) {
            if (item === undefined && title === undefined){
                throw new Error("please enter your title and todo");
            }else if (title === undefined){
                throw new Error("please enter your title");
            }else if (item === undefined){
                throw new Error("please enter your todo");
            }
            
        }

        this.title = title; 
        this.item = item;
        this.status = status;



    }

}