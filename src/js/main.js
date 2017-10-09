function abc(arrg1) {
  console.log(arrg1);
}

abc(1);

this.firstName = 'Panda';


// bad
function fight() {
  console.log('Swooosh!');
}

abc(2);

fight();
