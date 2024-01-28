"use strict";
  import tabs  from './modules/tabs';
  import modal from  './modules/modal';
  import timer  from './modules/timer';
  import cards  from './modules/cards';
  import calc  from './modules/calc';
  import forms  from  './modules/forms';
  import slider  from './modules/slider';

document.addEventListener("DOMContentLoaded", () => {
  
  tabs();
  modal("[data-modal]", ".modal", "body");
  timer();
  cards();
  calc();
  forms(".modal", "body", "form");
  slider();

});

// запуск json-server: npx json-server db.json

