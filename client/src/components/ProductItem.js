import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import { Card, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import star from '../assets/star.png';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../utils/consts';

const ProductItim = ({ product }) => {
    const navigate = useNavigate()
    return (
            <Col md={3} className='mt-3 ml-3' onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}>
                <Card style={{ width: 150, cursor: 'pointer', border: "light" }}>
                    <Image width={150} height={150} src={'http://localhost:5000/'+ product.img} />
                    <div className='text-black-50 d-flex mt-1 justify-content-between align-item-center'>
                        <div className='d-flex '>
                        <div>{product.name}</div>
                        </div>
                    </div>
                    <div>Цена:{product.price}</div>
                </Card>
            </Col>
    )
}

export default ProductItim;
