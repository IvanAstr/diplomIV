import React, { useContext,useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useCreateBrand} from '../../https/productAPI';

const CreateBrand = ({show,onHide}) => {

    const { createBrand } = useCreateBrand();
    const [value, setValue] = useState('');

    const addBrand =() =>{
        createBrand({name:value}).then(data => setValue(''))
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
                    Добавить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form>
                    <Form.Group style={{ minWidth: 250, height: 40 }} className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                            type="text"
                            placeholder="Введите название бренда"
                            autoFocus
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center align-items-center ">
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateBrand;