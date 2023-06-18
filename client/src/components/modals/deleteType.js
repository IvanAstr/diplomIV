import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Context } from '../../index';
import { Dropdown } from 'react-bootstrap';
import { useDeleteType } from '../../https/productAPI';
import { observer } from 'mobx-react-lite';

const DeleteType = observer (({ show, onHide }) => {
    const { product } = useContext(Context)
    const [info, setInfo] = useState([])
    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const [typeId, setTypeId] = useState('');
    const { deleteType } = useDeleteType();

    const destroy = () => {
        deleteType({typeId:`${typeId}`}).then(data => setTypeId(''))
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
                    Удалить тип
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
                        <option>Выберите тип</option>
                        {product.types.map(type =>
                            <option 
                            value={type.id} 
                            onClick={e => setTypeId(e.target.value)}

                            key={type.id}>
                                {type.name}
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
})

export default DeleteType;