// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string];
// } = {
//     name: "Michael",
//     age: 22,
//     hobbies: ['Sleeping'],
//     role: [2, 'author']
// }

// person.role.push('admin')
//person.role[1]=10;

enum Role { ADMIN, READ_ONLY, AUTHOR };

const person = {
    name: "Michael",
    age: 22,
    hobbies: ['Sleeping'],
    role: Role.ADMIN
}

let favoriteActivities: string[];
favoriteActivities = ['Sports']

console.log(person);

for (const hobby of person.hobbies) {
    console.log(hobby);
}

if (person.role===Role.ADMIN) {
    console.log("is admin");
    
}


//Tuple-fixed length and fixed type (push being an exception)