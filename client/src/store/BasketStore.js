import { makeAutoObservable } from "mobx";

export default class BasketStore {
  _basket = [];
  selectedProduct = null;
  prices = {};
  constructor() {
    // Попытка восстановить корзину из localStorage при создании объекта BasketStore
    const savedBasket = localStorage.getItem("basket");
    if (savedBasket) {
      this._basket = JSON.parse(savedBasket);
    }

    makeAutoObservable(this);
  }
  selectedProductCount = 0;

increaseSelectedProductCount() {
  this.selectedProductCount += 1;
}

decreaseSelectedProductCount() {
  if (this.selectedProductCount > 0) {
    this.selectedProductCount -= 1;
  }
}


  setBasket(basket) {
    this._basket = basket;

    // Сохранение корзины в localStorage
    localStorage.setItem("basket", JSON.stringify(basket));
  }

selectProduct(product, productCount) {
  this.selectedProduct = { ...product, count: productCount };
}

  addToCart(product) {
    const existingProduct = this._basket.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.count += 1;
      existingProduct.price = existingProduct.count * existingProduct.price; // Обновление цены
    } else {
      product.count = 1;
      product.price = product.count * product.price; // Обновление цены
      this._basket.push(product);
    }
  
    // Обновление цены в свойстве prices
    this.prices[product.id] = product.price;
  
    this.setBasket(this._basket);
  }

  removeFromCart(product) {
    const index = this._basket.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this._basket.splice(index, 1);
      this.setBasket(this._basket);
    }
  }

  increaseCount(product) {
    const existingProduct = this._basket.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.count += 1;
      existingProduct.price = existingProduct.count * (existingProduct.price / (existingProduct.count - 1));
      this.increaseSelectedProductCount(); // Увеличение количества выбранного товара
      this.setBasket(this._basket);
    }
  }
  
  decreaseCount(product) {
    const existingProduct = this._basket.find(item => item.id === product.id);
    if (existingProduct) {
      if (existingProduct.count > 1) {
        existingProduct.count -= 1;
        existingProduct.price = existingProduct.count * (existingProduct.price / (existingProduct.count + 1));
      } else {
        this.removeFromCart(product);
      }
      this.decreaseSelectedProductCount(); // Уменьшение количества выбранного товара
      this.setBasket(this._basket);
    }
  }

  get cart() {
    return this._basket;
  }

  products = [];

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(index) {
    this.products.splice(index, 1);
  }

  findProduct(index) {
    this.myProduct = this.products[index];
  }
}