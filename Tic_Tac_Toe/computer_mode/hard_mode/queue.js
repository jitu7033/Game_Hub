class Queue{
    constructor(){
        this.items = [];
    }

    // add element back of the queue 
    push(elemet){
        this.items.push(elemet);
    }

    // remove  elemetn from the front 
    pop(){
        if(this.isEmpty()){
            return "Queue is Empty";
        }
        return this.items.shift();
    }

    // print the element from the first 
    front(){
        if(this.isEmpty()){
            return "Queue is Empty";
        }
        return this.items[0];
    }
    size(){
        return this.items.length;
    }

    isEmpty(){
        return this.items.length == 0;
    }
}