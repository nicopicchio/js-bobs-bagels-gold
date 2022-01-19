const inventory = require('./inventory.js')

class Basket {
  constructor() {
    this.basket = [];
    this.basketSize = 4;
  }

  addBagelToBasket(sku) {
    for (let i = 0; i < inventory.length; i++){
      const bagel = inventory[i]
      if (bagel.sku === sku && this.basket.length < this.basketSize) {
        this.basket.push(bagel)
      }
    }
    return "Basket is full!"
  }

  removeBagelFromBasket(sku) {
    for (let i = 0; i < this.basket.length; i++) {
      const bagelToRemove = this.basket[i];
      if (bagelToRemove.sku == sku) {
        this.basket.splice(i, 1);
      }
    }
    return "This Bagel doesn't exist";
  }
  
  getTotalOfBasket() {
    let count = 0;
    for (let i = 0; i < this.basket.length; i++) {
        const bagelPrice = this.basket[i].price
        count = count + bagelPrice
    }
    count = count - this.getDiscount()
    return Number(count.toFixed(2))
  }

  getDiscount() {
    let discount = 0;
    const discountOnionArray = this.basket.filter(item => item.sku === "BGLO")
    const everythingBagelArray = this.basket.filter(item => item.sku === "BGLE")
    const plainBagelArray = this.basket.filter(item => item.sku === "BGLP")
    const discMultiplierOne = Math.trunc(discountOnionArray.length / 6)
    const discMultiplierTwo = Math.trunc(everythingBagelArray.length / 6)
    const discMultiplierThree = Math.trunc(plainBagelArray.length / 12)
    if (discountOnionArray.length >= 6) {
      discount = discount + (discMultiplierOne*0.45)
    }
    if (everythingBagelArray.length >= 6)  {
      discount = discount + (discMultiplierTwo*0.45)
    }
    if (plainBagelArray.length >= 12) {
      discount = discount + (discMultiplierThree*0.69)
    }
    return discount
  }

  getBagelPrice(sku) {
    for (let i = 0; i < inventory.length; i++) {
      const bagel = inventory[i]
      if(bagel.sku === sku) {
        return inventory[i]
      }
    }
  }

  getBasket() {
    return this.basket;
  }
}

module.exports = Basket;
