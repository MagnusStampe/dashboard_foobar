//#region DOM content loaded
"use strict";

document.addEventListener("DOMContentLoaded", init);
//#endregion

//#region init
function init() {
  update();
  //setInterval(update, 2000);
}

//#endregion init

//#region update cycle

function update() {
  let data = JSON.parse(FooBar.getData());
  doSomething(data);
}

function doSomething(dataThing) {
  console.log(dataThing);
}

//#endregion
