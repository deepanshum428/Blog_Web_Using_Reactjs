// function Parent() {
//     const data = ['sdf'];

//     function Child() {
//         console.log(data)
//     }
// }

function Parent() {
  const data = ["sdf"];

  function Child() {
    console.log(data);
  }

  return Child;
}

const ch = Parent();

console.log(ch);

function sum(a, b) {
  return a + b;
}

sum(2, 3);

const val = [2, 3];
sum(...val);
