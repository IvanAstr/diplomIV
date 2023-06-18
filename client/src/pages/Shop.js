import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import ProductList from '../components/ProductList';
// import { useCetchType } from '../https/productAPI';
import { useFetchType } from '../https/productAPI';
import { useFetchBrand } from '../https/productAPI';
import { useFetchProduct } from '../https/productAPI';
// import { useFetchProduct2 } from '../https/productAPI';
import Pages from '../components/Pages';

const Shop = observer(() => {

    const { fetchType } = useFetchType();
    const { fetchBrand } = useFetchBrand();
    const { fetchProduct } = useFetchProduct();
    // const { fetchProduct2 } = useFetchProduct2();

    const { product } = useContext(Context);

    useEffect(() => {
        fetchType().then(data => product.setTypes(data))
        fetchBrand().then(data => product.setBrands(data))
        fetchProduct(null,null,1,12).then(data => {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        })
    }, []);

    useEffect(() => {
        fetchProduct(product.selectedType.id,product.selectedBrand.id,product.page,12).then(data => {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        })
    }, [product.page, product.selectedType,product.selectedBrand]);

    return (
        <Container>
            <Row className='mt-4' style={{width:"100%"}}>
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <ProductList />
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;