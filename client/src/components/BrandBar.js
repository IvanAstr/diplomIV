import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite'
import { Context } from '../index';

const BrandBar = observer(() => {
    const { product } = useContext(Context)
    return (
        <Row className='d-flex'>
            {product.brands.map(brand =>
                <Card
                    style={{cursor:'pointer',minHeight:40, marginLeft:10}}
                    className='col-auto row-2 align-items-center justify-content-center'
                    key={brand.id}
                    onClick={() => product.setSelectedBrand(brand)}
                    border={brand.id === product.selectedBrand.id ? "dark" : "light"}

                >
                    {brand.name}
                </Card>
            )}
        </Row>
    )
})

export default BrandBar;