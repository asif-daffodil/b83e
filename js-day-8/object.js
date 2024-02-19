class myClass {
    myName = "Asif Abir";
    myNumber(){
        return 5;
    }
    // construct
    constructor(){
        console.log("I am a constructor");
    }

    destructor(){
        console.log("I am a destructor");
    }

    cleanup(){
        this.destructor();
    };
}

var myObject = new myClass();

console.log(myObject.myName); 
console.log(myObject.myNumber());
myObject.cleanup();
