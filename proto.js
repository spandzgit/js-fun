/**
 * ES5 approach - adding the common methods to proto of the function.
 * 
 * With this approach Object.keys even gives the methods under proto
 * as all are enumerable. To just get the keys we need to use the
 * hasOwnProperty method on the object.
 * 
 * Prototype - is a private property all objects in JS has which gives access
 * to an object called proto which has some methods which can be accessed
 * across multiple instances - typically the inheritance approach of JS.
 * 
 * Using the word "new" to create the object implictly under the hood helps
 * in (1.) creating the object using Object.create() so that its the instance of
 * the parent which help in delegating the failed lookups to functions
 * protoype (2.) returns the object "this" implictly.
 */
function car (name, model, color, type, speed, parked) {
    this.name = name;
    this.model = model;
    this.color = color;
    this.type = type;
    this.speed = speed;
    this.parked = parked;
}

car.prototype.drive = function(speed) {
    console.log(`Car is driving @ speed ${speed} m/hr`);
    this.speed = speed;
}

car.prototype.doPark = function(parked) {
    console.log(`Car is ${!!parked}`);
    this.parked= parked;
}

const car1 = new car('Honda', 'CRV', 'Silver', 'SUV');

car1.drive(70);

console.log(Object.getPrototypeOf(car1));

console.log(`*************************************`);
console.log(`Printing all properties of car object as all are enumarable.`);
for(let key in car1) {
    console.log(`car object has - ${key} as a key.`);
}
console.log(`*************************************`);
console.log(`Printing the own properties of car object.`);
for(let key in car1) {
    if(car1.hasOwnProperty(key)){
        console.log(`car object has - ${key} as a key.`)
    }
}
console.log(`*************************************`);

/**
 * new Agnostic functions.
 * 
 * We need to make sure that before calling the constructor function
 * its invoked with creation of the object using new keyword. If not
 * then it will not implictly create the object and not return it.
 * 
 * Considering a multi touchpoint env for the code we can make it
 * new Agnostic by checking if the instance is of that class - using
 * instanceof.
 */
function carNewAgnostic(name, model, color, type, speed, parked) {
    if(this instanceof carNewAgnostic === false) {
        return new carNewAgnostic(name, model, color, type, speed, parked);
    }

    this.name = name;
    this.model = model;
    this.color = color;
    this.type = type;
    this.speed = speed;
    this.parked = parked;
}

carNewAgnostic.prototype.drive = function(speed) {
    console.log(`Car is driving @ speed ${speed} m/hr`);
    this.speed = speed;
}

carNewAgnostic.prototype.doPark = function(parked) {
    console.log(`Car is ${!!parked}`);
    this.parked= parked;
}

const carNewAgnosticTest = carNewAgnostic('Chevy', 'Bolt', 'Silver', 'EV');

carNewAgnosticTest.drive(80);

console.log(Object.getPrototypeOf(carNewAgnosticTest));

console.log(`*************************************`);
console.log(`Printing all properties of car object as all are enumarable.`);
for(let key in carNewAgnosticTest) {
    console.log(`car object has - ${key} as a key.`);
}
console.log(`*************************************`);
console.log(`Printing the own properties of car object.`);
for(let key in carNewAgnosticTest) {
    if(carNewAgnosticTest.hasOwnProperty(key)){
        console.log(`car object has - ${key} as a key.`)
    }
}
console.log(`*************************************`);

/**
 * ES6 approach. A class with all the member variables set
 * using the constructor. 
 * 
 * The methods are defined inside the class and all instances
 * of the class has direct access to the methods.
 */
class carClass {
    constructor(name, model, color, type, speed, parked) {
        this.name = name;
        this.model = model;
        this.color = color;
        this.type = type;
        this.speed = speed;
        this.parked = parked;
    }

    drive(speed) {
        this.speed = speed;
    }

    doPark(parked) {
        this.parked = parked;
    }
}

const car2 = new carClass('Nissan', 'Sentra', 'Silver', 'Sedan');

car1.drive(65);

console.log(Object.getPrototypeOf(car2));

console.log(`*************************************`);
console.log(`Printing all properties of car object as all are enumarable.`);
for(let key in car2) {
    console.log(`car object has - ${key} as a key.`);
}
console.log(`*************************************`);
console.log(`Printing the own properties of car object.`);
for(let key in car2) {
    if(car2.hasOwnProperty(key)){
        console.log(`car object has - ${key} as a key.`)
    }
}
console.log(`*************************************`);
