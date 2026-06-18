export class Todo{
    constructor({title, item, status, created_at, updated_at}){
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
        this.created_at = created_at;
        this.updated_at = updated_at
        this.status = status;



    }

}