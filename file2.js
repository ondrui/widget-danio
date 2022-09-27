5 > 4;
"ананас" > "яблоко";
"2" > "12";
undefined == null;

function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Вы согласны?",
  function () {
    alert("Вы согласились.");
  },
  function () {
    alert("Вы отменили выполнение.");
  }
);

undefined === null;
null == "\n0\n";
null === +"\n0\n";
5 > 4;
"ананас" > "яблоко";
"2" > "12";
undefined == null;

let sayHi = function () {
  // (1) создаём
  alert("Привет");
};

let func = sayHi;

undefined === null;
null == "\n0\n";
null === +"\n0\n";
