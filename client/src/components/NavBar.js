// import React, { useContext } from 'react';
// import { Context } from '../index';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { ADMIN_ROUTE, BASKET_ROUTE, CONT_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
// import { Button } from 'react-bootstrap';
// import { observer } from 'mobx-react-lite';
// import { useNavigate } from 'react-router-dom';
// const NavBar = observer(() => {
//     const { user } = useContext(Context)

//     const navigate = useNavigate()
//     return (
//         <Navbar bg="dark" variant="dark">
//             <Container style={{height:50}}>
//                 <Navbar.Brand onClick={() => navigate(`${SHOP_ROUTE}`)}>Одежда для вас</Navbar.Brand>

//                 {user.isAuth ?
//                     <Nav className="ml-auto">
//                         <Nav.Link onClick={() => navigate(`${SHOP_ROUTE}`)} >Каталог</Nav.Link>
//                         <Nav.Link onClick={() => navigate(`${CONT_ROUTE}`)} >Контакты</Nav.Link>
//                         <Nav.Link onClick={() => navigate(`${BASKET_ROUTE}`)}>Корзина</Nav.Link>

//                         <Button variant='outline-light' onClick={() => navigate(`${ADMIN_ROUTE}`)}>Админ панель</Button>
//                         <Button variant='outline-light' onClick={() => navigate(`${LOGIN_ROUTE}`)}>Выйти</Button>
//                     </Nav>
//                     :
//                     <Nav className="ml-auto">
//                         <Nav.Link onClick={() => navigate(`${SHOP_ROUTE}`)} >Каталог</Nav.Link>
//                         <Nav.Link onClick={() => navigate(`${CONT_ROUTE}`)}>Контакты</Nav.Link>
//                         <Nav.Link onClick={() => navigate(`${BASKET_ROUTE}`)}>Корзина</Nav.Link>

//                         <Button variant='outline-light' onClick={() => user.setIsAuth(true)}>Авторизация</Button>
//                     </Nav>

//                 }

//             </Container>
//         </Navbar>
//     )
// })

// export default NavBar;

import React, { useContext, useEffect } from 'react';
import { Context } from '../index';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import {
  SHOP_ROUTE,
  CONT_ROUTE,
  BASKET_ROUTE,
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
} from '../utils/consts';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {

    console.log(user)
    user.logout(); // Сброс состояния авторизации пользователя
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container style={{ height: 50 }}>
        <Navbar.Brand onClick={() => navigate(SHOP_ROUTE)}>Одежда для вас</Navbar.Brand>

        {user.isAuth ? (
          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate(SHOP_ROUTE)}>Каталог</Nav.Link>
            <Nav.Link onClick={() => navigate(CONT_ROUTE)}>Контакты</Nav.Link>
            <Nav.Link onClick={() => navigate(BASKET_ROUTE)}>Корзина</Nav.Link>
            {user.isAdmin && (
              <Button variant="outline-light" onClick={() => navigate(ADMIN_ROUTE)}>
                Админ панель
              </Button>
            )}
            <Button variant="outline-light" onClick={handleLogout}>
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate(SHOP_ROUTE)}>Каталог</Nav.Link>
            <Nav.Link onClick={() => navigate(CONT_ROUTE)}>Контакты</Nav.Link>
            <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;