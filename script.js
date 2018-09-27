"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  setInterval(update, 2000);
}

function update() {
  let data = JSON.parse(FooBar.getData());
  doSomething(data.bartenders);
}

function doSomething(dataThing) {
  console.log(dataThing);
}
