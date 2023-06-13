// import React, { useState } from 'react';
// import { Button, Container, Form } from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';
// import { NavLink, useLocation } from 'react-router-dom'
// import Row from 'react-bootstrap/Row';
// import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
// import { login, registration } from '../https/userAPI';
// import { useRegistration, useLogin } from '../https/userAPI';
// const Auth = () => {

//     // const location = useLocation();
//     // const isLogin = location.pathname === LOGIN_ROUTE
//     // const [email, setEmail] = useState('');
//     // const [password, setPassword] = useState('');
//     // const click = async () => {
//     //     if (isLogin) {
//     //         const response = await login()

//     //     } else {
//     //         const response = await registration(email, password)
//     //         console.log(response)

//     //     }
//     // }
//     const location = useLocation();
//     const isLogin = location.pathname === LOGIN_ROUTE;
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const { registration } = useRegistration();
//     const { login } = useLogin();

//     const click = async () => {
//       if (isLogin) {
//         const response = await login(email, password);
//         console.log(response);
//       } else {
//         const response = await registration(email, password);
//         console.log(response);
//       }
//     };




//     return (
//         <Container
//             className="d-flex justify-content-center align-items-center"
//             style={{ height: window.innerHeight - 54 }}
//         >
//             <Card style={{ width: 600 }} className="p-5">
//                 <h2 className='m-auto'>{isLogin ? "Авторизация" : "Регистрация"}</h2>
//                 <Form className='d-flex flex-column' lg='2'>
//                     <Form.Control
//                         className='mt-3'
//                         placeholder='Введите ваш email...'
//                         value={email}
//                         onChange={e => setEmail(e.target.value)}
//                     >
//                     </Form.Control>

//                     <Form.Control
//                         className='mt-3'
//                         placeholder='Введите ваш пароль...'
//                         value={password}
//                         onChange={e => setPassword(e.target.value)}
//                         type='password'
//                     >
//                     </Form.Control>
//                     <Row className='d-flex'>
//                         {isLogin ?

//                             <div className='d-flex flex-row justify-content-between mt-3 pl-3 pr-3'>
//                                 <p>
//                                     Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}> Зарегистрируйся!</NavLink>
//                                 </p>
//                                 <Button style={{ height: 40 }} variant='outline-success'onClick={click} >Войти</Button>
//                             </div>

//                             :

//                             <div className='d-flex flex-row justify-content-between mt-3 pl-3 pr-3'>
//                                 <p>
//                                     Есть аккаунт? <NavLink to={LOGIN_ROUTE}> Войдите!</NavLink>
//                                 </p>
//                                 <Button style={{ height: 40 }} variant='outline-success'onClick={click} >Регистрация</Button>
//                             </div>
//                         }
//                         {/* <Button
//                             variant='outline-success'
//                             onClick={click}
//                         >
//                             {isLogin ? 'Войти': 'Регистрация'}
//                         </Button> */}
//                     </Row>
//                 </Form>
//             </Card>
//         </Container>
//     )
// }

// export default Auth;
import React, { useState, useContext, useEffect } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { NavLink, useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { useRegistration, useLogin } from '../https/userAPI';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { registration } = useRegistration();
  const { login } = useLogin();

  const { user } = useContext(Context);

  useEffect(() => {
    // Проверка состояния авторизации при загрузке компонента
    user.checkAuth();
  }, [user]);

  const handleAuthentication = async () => {
    // ...
  };

  const click = async () => {
    try {
      if (valid) {
        if (isLogin) {
          const response = await login(email, password);
          if (response.status === 200) {
            console.log(response);
            user.setIsAuth(true);
            user.setToken(response.data.jwtToken); // Сохранение токена в localStorage
            navigate(SHOP_ROUTE);
          } else {
            setShowModal(true);
            setModalMessage('Неверный логин или пароль!');
          }
        } else {
          const response = await registration(email, password);
          console.log(response);
          setShowModal(true);
          setModalMessage('Регистрация успешно выполнена!');
          setEmail('');
          setPassword('');
          setValid(false);
          navigate(LOGIN_ROUTE);
        }
      } else {
        setShowModal(true);
        setModalMessage('Пожалуйста, заполните все обязательные поля.');
      }
    } catch (error) {
      console.error(error);
      if (isLogin) {
        setShowModal(true);
        setModalMessage('Ошибка авторизации!');
      } else {
        setShowModal(true);
        setModalMessage('Ошибка регистрации!');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  const validateForm = () => {
    setValid(email !== '' && password !== '');
  };

  const validateEmail = () => {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    setValid(email !== '' && emailRegex.test(email) && password !== '');
  };

  const registr = async () => {
    click();
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column" lg="2">
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            onBlur={validateEmail}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            onBlur={validateForm}
          />
          {isLogin ? (
            <div className="d-flex flex-row justify-content-between mt-3 pl-3 pr-3">
              <p>
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
              </p>
              <Button style={{ height: 40 }} variant="outline-success" onClick={click}>
                Войти
              </Button>
            </div>
          ) : (
            <div className="d-flex flex-row justify-content-between mt-3 pl-3 pr-3">
              <p>
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
              </p>
              <Button style={{ height: 40 }} variant="outline-success" onClick={registr}>
                Регистрация
              </Button>
            </div>
          )}
        </Form>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Auth;
