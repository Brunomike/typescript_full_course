const userName = 'Mike';
//let age = 22;

// function add(a: number, b: number) {
//     let result;
//     result = a + b;
//     return result;
// }

// if (age > 20) {
//     let isOld = true;
// }

// console.log(isOld);

// console.log(result);

//Default parameters should be last in the arguments list
//const add = (a: number, b: number = 1) => a + b;
//console.log(add(2, 5));

const printOutput = (output: string | number) => console.log(output);

const button = document.querySelector('button');

if (button) {
    button.addEventListener('click', event => console.log(event));
}

//printOutput(add(5));

//Spread

const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking', ...hobbies];

const person = {
    firstName: 'Mike',
    age: 30
}

const copiedPerson = { ...person };


//Rest Operator
const add = (...numbers: number[]) => {
    return numbers.reduce((currentResult, currentValue) => {
        return currentResult + currentValue
    }, 0);
}

const addedNumbers = add(5, 10, 2, 3.7)
console.log(addedNumbers);

const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobby1);
console.log(hobby2);

const { firstName, age } = person;
