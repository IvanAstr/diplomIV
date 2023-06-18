import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useCreateType} from '../../https/productAPI';

const CreateType = ({ show, onHide }) => {

    const { createType } = useCreateType();
    const [value, setValue] = useState('');

    const addType =() =>{
        createType({name:value}).then(data => setValue(''))
        setTimeout(()=> window.location.reload(),200)

        onHide();
    };

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
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" style={{ minWidth: 250, height: 40 }} controlId="exampleForm.ControlInput1">
                        <Form.Control
                            type="text"
                            placeholder="Введите название типа"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center align-items-center ">
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateType;