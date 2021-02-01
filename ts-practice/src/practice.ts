/* 1. interface에서 Generics 사용 */
interface Items<T> {
    list: T[];
}

const items: Items<string> = {
    list: ['a', 'b', 'c'],
};
console.log(items); //{ list: [ 'a', 'b', 'c' ] }

/* 2. type에서 Generics 사용하기 */
type TypeItems<T> = {
    list: T[];
};

const typeItems: TypeItems<string> = {
    list: ['a', 'b', 'c'],
};
console.log(typeItems); //{ list: [ 'a', 'b', 'c' ] }

/* 3. class에서 Generics 사용하기 */
class Queue<T> {
    list: T[] = [];
    get length() {
        return this.list.length;
    }
    enqueue(item: T) {
        this.list.push(item);
    }
    dequeue() {
        return this.list.shift();
    }
}

const queue = new Queue<number>();
queue.enqueue(0);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue()); //0
console.log(queue.dequeue()); //1
console.log(queue.dequeue()); //2
console.log(queue.dequeue()); //3
console.log(queue.dequeue()); //4
