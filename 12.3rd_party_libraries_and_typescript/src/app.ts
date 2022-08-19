import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validate, Validate } from 'class-validator';
import _ from 'lodash';

import { Product } from './product.model';


//declare var GLOBAL: any;
//console.log(GLOBAL);
//console.log(_.shuffle([1, 2, 3]));

const products = [
    { title: 'A Carpet', price: 29.99 },
    { title: 'A Book', price: 12.99 }
];

const newProd = new Product('', -5.99);
validate(newProd)
    .then(errors => {
        if (errors.length > 0) {
            console.log('VALIDATION ERRORS!');
            console.log(errors);
        } else {
            console.log(newProd.getInformation());
        }
    })



//const p1 = new Product('A Book', 12.99);
//console.log(p1.getInformation());

// const loadedProducts = products.map(prod => {
//     return new Product(prod.title, prod.price);
// })


const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
    console.log(prod.getInformation());
}
