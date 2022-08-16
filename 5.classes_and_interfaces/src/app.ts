//Interface - Describes the structure of an object
//type AddFn = (a: number, b: number) => number;
interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
}

//console.log(add(12,13));

interface Named {
    readonly name?: string;
    outputName?: string;
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

// interface Person {
//     name: string;
//     age: number;

//     greet(phrase: string): void;
// }

class Person implements Greetable {
    name?: string;
    //age: 22;

    constructor(n?: string) {
        if (n) {
            this.name = n;
        }
    }

    greet(phrase: string): void {
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        } else {
            console.log("Hi!");

        }
    }
}

// let user1: Person;
// user1 = {
//     name: "Michael Bruno",
//     age: 22,
//     greet(phrase: string) {
//         console.log(`${phrase} from ${this.name}, ${this.age} years old.`);
//     },
// }

// user1.greet("Greetings");

let user2 = new Person('Michael');
user2.greet('Hi there - I am');
console.log(user2);
