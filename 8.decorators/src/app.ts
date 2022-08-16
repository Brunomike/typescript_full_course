//Decorators - 

/**
 * class, methods, accessors can return
 * parameters, and properties can return but typescript will ignore them
 */

function Logger(logString: string) {
    console.log('LOGGER FACTORY');

    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}
//Decorator factory-returns a decorator function allowing us to configure it

function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    return function <T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(...args: any[]) {
                super();
                console.log('Rendering template');

                const hookEl = document.getElementById(hookId);

                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = 'Mike';

    constructor() {
        console.log('Creating person object....');

    }
}

// const pers = new Person();
// console.log(pers);

//Property Decorators
function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator');
    console.log(target, propertyName);
}

//Accessor Decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);

}

//Method Decorator
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
    console.log('Method decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);

    return {

    }
}

function Log4(target: any, name: string, position: number) {
    //name of the methiod
    console.log('Parameter decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}


class Product {
    @Log
    title: string;
    _price: number;

    @Log2
    set price(value: number) {
        if (value > 0) {
            this._price = value;
        } else {
            throw new Error('Invalid price -  should be positive.')
        }

    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjustedDescriptor;
}

class Printer {
    message = 'This works!';

    @AutoBind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);


//Validation with Decorators
interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]//['required','positive']
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required']
    }
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    }
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        //console.log(prop);
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}


class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!');
        return;
    }

    console.log(createdCourse);
})

//https://github.com/typestack/class-validator