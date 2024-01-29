import { getResource } from "../services/servises";

function cards() {
  // classes for cards

  class MenuCard {
   constructor(src, alt, title, descr, price, parentSelector, ...classes) {
     this.src = src;
     this.alt = alt;
     this.title = title;
     this.descr = descr;
     this.price = price;
     this.transfer = 27;
     this.changeToUAH();
     this.parent = document.querySelector(parentSelector);
     this.classes = classes;
   }
   changeToUAH() {
     this.price = this.price * this.transfer;
   }
   render() {
     const element = document.createElement("div");

     if (this.classes.length === 0) {
       this.classes = ["menu__item"];
     }

     this.classes.forEach((item) => {
       element.classList.add(item);
     });

     element.innerHTML = `
         <img src=${this.src} alt=${this.alt}>
         <h3 class="menu__item-subtitle">${this.title}</h3>
         <div class="menu__item-descr">${this.descr}</div>
         <div class="menu__item-divider"></div>
         <div class="menu__item-price">
           <div class="menu__item-cost">Цена:</div>
           <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
         </div>`;

     this.parent.append(element);
   }
 }

 getResource ("http://localhost:3000/menu")
   .then (result => {
     result.forEach (({img, altimg, title, descr, price}) => {
       new MenuCard (img, altimg, title, descr, price, '.menu .container').render ();
     });
   });

   /* axios.get ("http://localhost:3000/menu")
     .then (data => {
       data.data.forEach (({img, altimg, title, descr, price}) => {
         new MenuCard (img, altimg, title, descr, price, '.menu .container').render ();
       });
     }); */

}

export default cards;