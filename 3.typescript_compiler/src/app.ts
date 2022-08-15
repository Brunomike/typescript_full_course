const userName = "Michael";

const button = document.querySelector('button')!;

function add(n1: number, n2: number) {
    if (n1 + n2 > 0) {
        return n1 + n2
    }
    return;
}


function clickHandler(message: string) {
    console.log("Clicked " + message);
}

button.addEventListener('click', clickHandler.bind(null, "by " + userName));
