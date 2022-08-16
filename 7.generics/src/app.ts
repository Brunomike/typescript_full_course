// Generics - Type that is connected to another type,flexible regarding which type the other type is
// arrays,promise
// const names = ['Max', 'Manuel'];
// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('This is done!');
//     }, 2000)
// });

// promise.then(data=>{
//     data.split('');
// })

/* Creating a Generic Function */

//constraints
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergeObj = merge<{ name: string, hobbies: string[] }, { age: number }>({ name: "Michael", hobbies: ['Sports'] }, { age: 22 });
const mergeObj2 = merge({ name: "Michael" }, { age: 22 });
console.log(mergeObj);
console.log(mergeObj);


//Another generic function
interface Lengthy {
    length: number
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value.';
    if (element.length === 1) {
        descriptionText = 'Got 1 element';
    } else if (element.length > 1) {
        descriptionText = 'Got ' + element.length + ' elements.';
    }
    return [element, descriptionText]
}

console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe(['Sports', 'Cooking']));


// The keyof Constraint

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key];
}

extractAndConvert({ name: "Michael" }, 'name');

//Generic Classes

class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() {
        return [...this.data];
    }
}


const textStorage = new DataStorage<string>();
textStorage.addItem("Michael");
textStorage.addItem("Bruno");
textStorage.removeItem("Michael");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const mikeObj = { name: "Michael" }
// objStorage.addItem(mikeObj);
// objStorage.addItem({ name: "Bruno" });
// objStorage.removeItem(mikeObj);
// console.log(objStorage.getItems());


//Generic Utility Types
interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;

    return courseGoal as CourseGoal;
    //return { title: title, description: description, completeUntil: date }
}

const names: Readonly<string[]> = ['Michael', 'John'];
//names.push('Doe');
//names.pop()