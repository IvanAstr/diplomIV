import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Context } from '../../index';
import { Dropdown } from 'react-bootstrap';
import { useDeleteProduct } from '../../https/productAPI';
import { $authHost, $host } from "../../https/index";
// import { useFetchProduct2 } from '../../https/productAPI';

const DeleteProduct = ({ show, onHide }) => {
    // const { product } = useContext(Context)
    const [info, setInfo] = useState([])
    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    // const { fetchProduct2 } = useFetchProduct2();

    const [product, setProduct] = useState()

    const fetchProduct2 = React.useCallback(async () => {
        const { data } = await $host.get('/api/product/all2');
        console.log(data)
        setProduct(data)
        return data;
    }, []);

    const [id, setId] = useState('');
    const { deleteProduct } = useDeleteProduct();

    const destroy = () => {
        deleteProduct({ id: `${id}` }).then(data => setId(''))
        setTimeout(() => window.location.reload(), 200)
        onHide();
    }

    React.useEffect(() => {
        fetchProduct2()
    }, [fetchProduct2])

    // console.log("fetchProduct2 ",product)
    if (product) {

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
                        Удалить продукт
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Select className="mt-3" style={{ minWidth: 250, height: 40 }} aria-label="Default select example">
                            <option>Выберите продукт</option>
                            {product.map(product =>
                                <option
                                    value={product.id}
                                    key={product.id}
                                    onClick={e => setId(e.target.value)}
                                >
                                    {product.id} - {product.name}
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
}

export default DeleteProduct;