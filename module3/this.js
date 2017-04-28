function Person(){
  this.fullName = "Peter";
  this.fav = "Cookies";

  this.describe = function () {
    console.log('this is ', this);
    console.log(this.fullName + " likes " + this.fav);
  };
}

var peter = new Person();
peter.describe();

// this taken out of context
var describe = peter.describe;
describe();

// giving out of context this a context 
describe.call(peter);
