import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Context } from '../../index';
import { Dropdown } from 'react-bootstrap';
import { useUpdateType } from '../../https/productAPI';


const EditType = ({ show, onHide }) => {
    const { product } = useContext(Context)
    const [info, setInfo] = useState([])
    const [name, setName] = useState()


    const [type, setType] = useState();
    const { updateType } = useUpdateType();

    const update = () => {
        console.log(name)
        updateType(type, name).then(data => setType(''))
        setTimeout(() => window.location.reload(), 200)

        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            className="d-flex justify-content-center align-items-center "
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Реадктировать тип
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


                    <Form.Select className="mt-3" style={{ width: 300, height: 40 }} aria-label="Default select example">
                        <option>Выберите тип</option>
                        {product.types.map(type =>
                            <option
                                value={type.id} 
                                onClick={e => setType(e.target.value)}
    
                                key={type.id}>
                                {type.name}
                            </option>

                        )}
                    </Form.Select>

                    <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                            type="text"
                            placeholder="Введите новое название типа"
                            autoFocus
                            onChange={(e)=>{setName(e.target.value)}}
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center align-items-center ">
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={update}>Сохранить</Button>
            </Modal.Footer>
        </Modal>

    )
}

export default EditType;