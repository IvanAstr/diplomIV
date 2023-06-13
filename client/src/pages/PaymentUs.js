import React, { useRef, useState,useEffect } from 'react';
import emailjs from '@emailjs/browser';
import "./contactsStyle.css";
import "./paymentUs.css";
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import  basketStore  from "../store/BasketStore";
import { BASKET_ROUTE } from '../utils/consts';

export const PaymentUs = observer(() => {
    const { basket } = useContext(Context);
    const selectedProduct = basket.selectedProduct;
    const form = useRef();


    
    const sendEmail = (e) => {
      e.preventDefault();
      emailjs
        .sendForm('service_7y7nlj4', 'template_1xq2b2d', form.current, 'JUiyCQM28c1tvemAP')
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      e.target.reset();
    };
  
    if (!selectedProduct) {
      return <div>Выберите продукт</div>;
    }

  
    return (
      <>
        <div className="container">
          <div className="content">
            <div className="right-side">
              <div className="topic-text">Форма оплаты</div>
              <p>
                После отправки формы, наш специалист свяжется с вами и уточнит все характеристики товара.
                <br />
                Также вы можете указать размер товара, цвет, покрой, количество и пр. в сообщении.
              </p>
              <form ref={form} onSubmit={sendEmail}>
                <div className="input-box">
                  <input type="text" name="user_name" placeholder="Ваше имя" />
                </div>
                <div className="input-box">
                  <input
                    type="tel"
                    id="phone"
                    name="user_phone"
                    placeholder="Номер телефона"
                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                    required
                  />
                </div>
                <div className="input-box">
                  <input type="email" name="user_email" placeholder="E-mail" />
                </div>
                <div className="input-box message-box">
                  <textarea name="message" placeholder="Сообщение"></textarea>
                </div>
  
                <div className="cardMyProduct">
                  <div className="photo">
                    <img src={`http://localhost:5000/${selectedProduct.img}`} alt="Product" />
                  </div>
                  <div className="description">
                    <h2>{selectedProduct.name}</h2>
                    <h3>Цена: {selectedProduct.price} р.</h3>
                    <h3>Количество: {selectedProduct.count}</h3>
                  </div>
  
                  <input type="hidden" name="product_id" value={selectedProduct.id} />
                  <input type="hidden" name="product_name" value={selectedProduct.name} />
                  <input type="hidden" name="product_price" value={selectedProduct.price} />
                  <input type="hidden" name="product_count" value={selectedProduct.count} />
                </div>
  
                <div className="button">
                  <input type="submit" value="Отправить" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  });