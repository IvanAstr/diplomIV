import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Context } from '../../index';
import { Dropdown } from 'react-bootstrap';
import { useDeleteBrand } from '../../https/productAPI';

const DeleteBrand = ({ show, onHide }) => {
    const { product } = useContext(Context)
    const [info, setInfo] = useState([])
    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }

    const [id, setId] = useState('');
    const { deleteBrand } = useDeleteBrand();

    const destroy = () => {
        deleteBrand({id:`${id}`}).then(data => setId(''))
        setTimeout(()=> window.location.reload(),200)

        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered 
            className="d-flex justify-content-center align-items-center "
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить бренд
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


                    <Form.Select className="mt-3" style={{ minWidth: 250, height: 40 }} aria-label="Default select example">
                        <option>Выберите бренд</option>
                        {product.brands.map(brand =>
                            <option 
                            value={brand.id}
                            onClick={e => setId(e.target.value)}
                             key={brand.id}>
                                {brand.name}
                            </option>

                        )}
                    </Form.Select>

                    
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center align-items-center ">
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={destroy}>Удалить</Button>
            </Modal.Footer>
        </Modal>

    )
}

export default DeleteBrand;