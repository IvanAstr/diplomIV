import React, { useContext, useState,useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Context } from '../../index';
import { Dropdown } from 'react-bootstrap';

import { useFetchType } from '../../https/productAPI';
import { useFetchBrand } from '../../https/productAPI';
import { useFetchProduct } from '../../https/productAPI';
import {useCreateProduct} from '../../https/productAPI';
import { observer } from 'mobx-react-lite';

const CreateProduct = observer( ({ show, onHide }) => {
    const { product } = useContext(Context)

    const { createProduct } = useCreateProduct();

    const [info, setInfo] = useState([])
    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }

    const { fetchType } = useFetchType();
    const { fetchBrand } = useFetchBrand();
    const { fetchProduct } = useFetchProduct();

    useEffect(() => {
        fetchType().then(data => product.setTypes(data))
        fetchBrand().then(data => product.setBrands(data))
    }, []);

    const [brand, setBrand] = useState('');
    const [type, setType] = useState('');

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);


    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const addProduct = () =>{
        const formData = new FormData();
        
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('BrandId', product.selectedBrand.id)
        formData.append('TypeId', product.selectedType.id)
        formData.append('description', description)
        formData.append('color', color)
        formData.append('size', `${size}`)
        createProduct(formData).then(data => onHide())
        setTimeout(()=> window.location.reload(),200)

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
                            <option
                                onClick={() => product.setSelectedType(type)}
                                onChange={e => setType(e.target.value)}
                                required
                                key={type.id}>
                                {type.name}
                                
                            </option>

                        )}
                    </Form.Select>

                    <Form.Select className="mt-3" style={{ width: 200, height: 40 }} aria-label="Default select example">
                        <option>Выберите бренд</option>
                        {product.brands.map(brand =>
                            <option
                                onClick={() => product.setSelectedBrand(brand)}
                                onChange={e => setBrand(e.target.value)}
                                required
                                value={brand.id}
                                key={brand.id}>

                                {brand.name}
                            </option>

                        )}
                    </Form.Select>

                    <Form.Group className="mt-3" controlId="exampleForm.name">
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Введите название продукта"
                            autoFocus
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="exampleForm.price">
                        <Form.Control
                            type="number"
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            placeholder="Введите стоимость продукта"
                            required
                        />
                    </Form.Group>


                    <Form.Group className="mt-3" controlId="exampleForm.description">
                        <Form.Control
                            type="text"
                            placeholder="Введите описание продукта"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mt-3" controlId="exampleForm.size">
                        <Form.Control
                            type="number"
                            value={size}
                            onChange={e => setSize(e.target.value)}
                            placeholder="Введите разме продукта"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="exampleForm.color">
                        <Form.Control
                            type="text"
                            value={color}
                            onChange={e => setColor(e.target.value)}
                            placeholder="Введите цвет продукта"
                            autoFocus
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="exampleForm.file">
                        <Form.Control
                            type="file"
                            autoFocus
                            onChange={selectFile}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={addProduct}>Добавить</Button>
            </Modal.Footer>
        </Modal>

    )
})

export default CreateProduct;