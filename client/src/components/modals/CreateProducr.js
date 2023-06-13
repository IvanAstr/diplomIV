import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Context } from '../../index';
import { Dropdown } from 'react-bootstrap';
const CreateProduct = ({ show, onHide }) => {
    const { product } = useContext(Context)
    const [info, setInfo] = useState([])
    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить продукт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* <Dropdown>
                        <Dropdown.Toggle>Выберите тип</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.types.map(type =>
                                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown> */}

                    <Form.Select className="mt-3" style={{ width: 200, height: 40 }} aria-label="Default select example">
                        <option>Выберите тип</option>
                        {product.types.map(type =>
                            <option value={type.id} key={type.id}>{type.name}</option>

                        )}
                    </Form.Select>

                    <Form.Select className="mt-3" style={{ width: 200, height: 40 }} aria-label="Default select example">
                        <option>Выберите бренд</option>
                        {product.brands.map(brand =>
                            <option value={brand.id} key={brand.id}>{brand.name}</option>

                        )}
                    </Form.Select>

                    <Form.Group className="mt-3" controlId="exampleForm.name">
                        <Form.Control
                            type="text"
                            placeholder="Введите название продукта"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="exampleForm.price">
                        <Form.Control
                            type="number"
                            placeholder="Введите стоимость продукта"
                            autoFocus
                        />
                    </Form.Group>


                    <Form.Group className="mt-3" controlId="exampleForm.description">
                        <Form.Control
                            type="text"
                            placeholder="Введите описание продукта"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="exampleForm.description">
                        <Form.Control
                            type="number"
                            placeholder="Введите разме продукта"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="exampleForm.description">
                        <Form.Control
                            type="text"
                            placeholder="Введите цвет продукта"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="exampleForm.file">
                        <Form.Control
                            type="file"
                            autoFocus
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>

    )
}

export default CreateProduct;