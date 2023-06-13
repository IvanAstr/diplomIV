
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Button, Container, ListGroup, Image, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PAYMENT_ROUTE } from '../utils/consts';

const CartPage = observer(() => {
  const { basket } = useContext(Context);
  const navigate = useNavigate();

  const handleRemoveFromCart = (product) => {
    basket.removeFromCart(product);
  };

  const increaseCount = (product) => {
    basket.increaseCount(product);
  };

  const decreaseCount = (product) => {
    basket.decreaseCount(product);
  };

  const byProduct = (product, productCount) => {
    basket.selectProduct(product, productCount);
    navigate(PAYMENT_ROUTE);
  };

  return (
    <Container className='mt-3 d-flex flex-column'>
      <h2>Корзина</h2>
      {basket.cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ListGroup style={{ width: "100%" }} className='d-flex flex-wrap flex-row m-3 justify-content-center'>
          {basket.cart.map((product) => (
            <Card
              className='m-3'
              key={product.id}
              style={{ width: 150, cursor: 'pointer', border: "light" }}
            >
              <Image width={150} height={150} src={'http://localhost:5000/' + product.img} />
              <div className='text-black-50 d-flex mt-1 justify-content-between align-item-center'>
                <div className='d-flex '>
                  <div>{product.name}</div>
                </div>
              </div>
              <div>Цена: {product.price}</div>
              <div>Количество: {product.count}</div>

              <div>
                <Button className='m-1' variant='outline-secondary' size='sm' onClick={() => decreaseCount(product)}>
                  -
                </Button>
                <Button className='m-1' variant='outline-secondary' size='sm' onClick={() => increaseCount(product)}>
                  +
                </Button>
              </div>
              <Button variant='outline-dark' onClick={() => byProduct(product, product.count)}>Оформить</Button>   
              <Button variant='outline-danger' onClick={() => handleRemoveFromCart(product)}>Удалить</Button>
         </Card>
          ))}
        </ListGroup>
      )}
    </Container>
  );
});

export default CartPage;