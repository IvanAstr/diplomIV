import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./contactsStyle.css"

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
    'service_7y7nlj4',
    'template_k9l9orj',
    form.current,
    'JUiyCQM28c1tvemAP')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      e.target.reset();
  };

  return (
  <>


    {/* <!-- Контейнер выравнивает по ширине и по центру --> */}
    <div className="container">

      {/* <!-- content содержит содержимое формы --> */}
      <div className="content">

        {/* <!-- Левая колонка: адрес, телефоны, email. Можете добавить свое --> */}
        <div className="left-side">
          <div className="address details">

            {/* <!-- Вместо классов: название шрифтовых иконок (fontawesome.com) --> */}
            <i className="fas fa-map-marker-alt"></i>

            {/* <!-- topic - заголовок, text-one, text-two - текст --> */}
            <div className="topic">Адрес</div>
            <div className="text-one">Барнаул</div>
            <div className="text-two">ул.Советов 32</div>
          </div>
          <div className="phone details">
            <i className="fas fa-phone-alt"></i>
            <div className="topic">Телефон</div>
            <div className="text-one">+7 988 888 88 88</div>
            <div className="text-two">+7 999 999 99 99</div>
          </div>
          <div className="email details">
            <i className="fas fa-envelope"></i>
            <div className="topic">Email</div>
            <div className="text-one">support@site.com</div>
            <div className="text-two">Example@example.com</div>
          </div>
        </div>

        {/* <!-- Правая колонка: сама форма --> */}
        <div className="right-side">

          {/* <!-- Заголовок для формы --> */}
          <div className="topic-text">Отправьте нам сообщение</div>

          {/* <!-- Какой-то дополнительный текст --> */}
          <p>
            Если у вас есть какие-то вопросы или предложения по сотрудничеству -
            заполните форму ниже
          </p>

          {/* <!-- Форма обратной связи --> */}
          <form ref={form} onSubmit={sendEmail}>

            {/* <!-- Каждый input для выравнивания вкладываем в блок input-box --> */}
            <div className="input-box">
              <input type="text" name="user_name" placeholder="Ваше имя" />
            </div>
            <div className="input-box">
              <input type="email" name="user_email" placeholder="Введите email" />
            </div>
            <div className="input-box message-box">
              <textarea name="message" placeholder="Сообщение"></textarea>
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
};