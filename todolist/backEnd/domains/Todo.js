export class Todo{
    constructor({item, status}){
        if (!item) {
            throw new Error("กรุณากรอกกิจกรรม");
        }

        this.item = item
        this.status = status

    }

}