/** Advanced Types
 *  - Intersection Types - Allows us to combine other types
 *  - Type Guards
 *  - Discriminated Unions
 *  - Type Casting
 *  - Function Overloads
 */


// 1. Intersection Types
type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: "Michael",
    privileges: ['create-server'],
    startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

//2. Type Guards 
//6. Function Overloads
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

//const result = add(1, 5);
const result = add('Mike', ' Bruno');
result.split(' ');


type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);
    if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('Start Date: ' + emp.startDate);
    }
}

printEmployeeInformation(e1);

class Car {
    drive() {
        console.log("Driving...");
    }
}
class Truck {
    drive() {
        console.log("Driving a truck...");
    }
    loadCargo(amount: number) {
        console.log('Loading cargo...' + amount);
    }
}


type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(v2);

// 3. Discriminated Union
interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }

    console.log('Moving at speed: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });

// 4. Type Casting
const paragraph = <HTMLParagraphElement>document.getElementById('message-output');
//const userInputElement = document.getElementById("user-input")! as HTMLInputElement;
const userInputElement = document.getElementById("user-input");

if (userInputElement) {
    (userInputElement as HTMLInputElement).value = 'Hi there!';
}

//userInputElement.value = 'Hi there!';

// 5. Index Properties
interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    username: 'Must start with a capital character'
}



// 7. Optional Chaining
const fetchedUserData = {
    id: 'u1',
    name: 'Michael',
    //  job: { title: 'CEO', description: 'My own company' }
}

//console.log(fetchedUserData.job && fetchedUserData.job.title);
console.log(fetchedUserData?.job?.title);


// 8. Nullish Coalescing
const userInput1 = '';
//const storedData = userInput1 || 'DEFAULT';
const storedData=userInput1 ?? 'DEFAULT'; //NULL or UNDEFINED ONLY
console.log(storedData);
