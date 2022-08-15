let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Mike';
if (typeof userInput === 'string') {
    userName = userInput;
}


function generateError(message: String, code: number):never {
    throw { message: message, errorCode: code }

    //infinite loops also make a function return type never
}

const result=generateError("An error cocurred!",500);
console.log(result);
