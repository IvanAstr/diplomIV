import React, { useContext, useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { observer } from 'mobx-react-lite'
import { Context } from '../index';
import ProductItim from '../components/ProductItem';
import { Button, Container, Image, Modal } from 'react-bootstrap';
import star from '../assets/star.png';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { useFetchOneProduct } from '../https/productAPI';
import { useAddProductInBasket } from '../https/productAPI';

const ProductPage = observer(() => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { productStore, basket } = useContext(Context);

  const { user } = useContext(Context);

  const { fetchOneProduct } = useFetchOneProduct();
  const { addProduct } = useAddProductInBasket();
  const [showModal, setShowModal] = useState(false); // Состояние для отображения/скрытия модального окна

  useEffect(() => {
    fetchOneProduct(id).then(data => {
      setProduct(data);
    });
  }, []);

  const handleAddToCart = async () => {
    const price = parseFloat(product.price); // Преобразование значения цены в число
    const updatedProduct = { ...product, price }; // Обновленный объект продукта с числовым значением цены
    await basket.addToCart(updatedProduct);
    setShowModal(true); // Открыть модальное окно после добавления в корзину
  };

  const handleCloseModal = () => {
    setShowModal(false); // Закрыть модальное окно
  };

  return (
    <Container style={{ flexWrap: "wrap" }} className='mt-3 d-flex justify-content-center' >
      <Col md={6} className='d-flex justify-content-center'>
        {product && <Image width={300} height={300} src={'http://localhost:5000/' + product.img} />}
      </Col>
      <Col md={6} className='d-flex justify-content-center'>
        <Row>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex flex-column align-items-center">
              {product && <h2>{product.name}</h2>}
              {/* {product && (
                <h5 className="d-flex justify-content-center align-items-center">
                  <Image width={18} height={18} src={star} />
                </h5>
              )} */}

              {product && (
                <h4>Цена: {product.price} р.</h4>
              )}
            </div>

            <div className='mt-5 pl-3'>
              <Form.Select style={{ width: 200, height: 40 }} aria-label="Default select example">
                <option>Размер</option>
                <option value="1">46</option>
                <option value="2">48</option>
                <option value="3">50</option>
                <option value="3">52</option>
                <option value="3">54</option>
                <option value="3">56</option>
                <option value="3">58</option>
              </Form.Select>

              <Form.Select className="mt-3" style={{ width: 200, height: 40 }} aria-label="Default select example">
                <option>Цвет</option>
                <option value="1">Синий</option>
                <option value="2">Красный</option>
                <option value="3">Зеленый</option>
                <option value="3">Белый</option>
                <option value="3">Черный</option>
              </Form.Select>
              {user.isAuth ? (
                <Button className='mt-4' variant='outline-dark' onClick={handleAddToCart}>Добавить в корзину</Button>
              ) : (<></>)
              }
            </div>
          </div>
        </Row>
      </Col>
      <div md={12} className='d-flex mt-5 flex-column justify-content-center align-items-center'>
        <h4>Описание</h4>
        <span className="mt-3">
          {product.description}
        </span>
      </div>

      {/* Модальное окно с сообщением */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Товар добавлен в корзину</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Товар успешно добавлен в корзину!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
});

export default ProductPage;