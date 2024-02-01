function sajal(type, n1, n2) {
    switch (type) {
        case 'add':
            return n1 + n2;
        case 'sub':
            return n1 - n2;
        case 'mul':
            return n1 * n2;
        case 'div':
            return n1 / n2;
    }
}

console.log(sajal('add', 10, 20));
console.log(sajal('sub', 20, 10));
console.log(sajal('mul', 10, 20));
console.log(sajal('div', 20, 10));

function shawon (type, n1, n2) {
  if (type === "add") {
    return n1 + n2;
  } else if (type === "sub") {
    return n1 - n2;
  } else if (type === "mul") {
    return n1 * n2;
  } else if (type === "div") {
    return n1 / n2;
  } else {
    return "Invalid Operation";
  }
}

console.log(shawon('add', 10, 20));
console.log(shawon('sub', 20, 10));
console.log(shawon('mul', 10, 20));
console.log(shawon('div', 20, 10));

function showName (name) {
    return "Welcome " + name;
}

console.log(showName("Sajal"));


function ten2twenty (num) {
    console.log(num);
    if(num > 0) {
        ten2twenty(num - 1);
    }
}

ten2twenty(10);
