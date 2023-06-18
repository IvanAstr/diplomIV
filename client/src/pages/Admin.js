import React, { useState,useEffect,useContext } from 'react';
import { Button, Col, Container } from 'react-bootstrap';
import CreateType from '../components/modals/CreateType';
import CreateBrand from '../components/modals/CreateBrand';
import CreateProduct from '../components/modals/CreateProducr';
import EditProduct from '../components/modals/editProduct';
import EditType from '../components/modals/editType';
import EditBrand from '../components/modals/editBrand';
import DeleteBrand from '../components/modals/deleteBrand';
import DeleteProduct from '../components/modals/deleteProduct';
import DeleteType from '../components/modals/deleteType';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ProductList from '../components/ProductList';
import Pages from '../components/Pages';
import Shop from './Shop';


import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
// import { useCetchType } from '../https/productAPI';
import { useFetchType } from '../https/productAPI';
import { useFetchBrand } from '../https/productAPI';
import { useFetchProduct } from '../https/productAPI';
// import { useFetchProduct2 } from '../https/productAPI';



const Admin = observer (() => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)
    const [deleteProductVisible, setDeleteProductVisible] = useState(false)
    const [deleteBrandVisible, setDeleteBrandVisible] = useState(false)
    const [deleteTypeVisible, setDeleteTypeVisible] = useState(false)
    const [editTypeVisible, setEditTypeVisible] = useState(false)
    const [editBrandVisible, setEditBrandVisible] = useState(false)
    const [editProductVisible, setEditProductVisible] = useState(false)


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

        <Tab.Container className="mt-5" id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row className="mt-5" style={{margin:0, padding:0}}>
                <Col sm={3}>
                    <ListGroup>
                        <ListGroup.Item action href="#link1">
                            Просмотр
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link2">
                            Операции
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col sm={7}>
                    <Tab.Content>
                        <Tab.Pane eventKey="#link1">
                            <ProductList/>
                            <Pages/>
                        </Tab.Pane>

                        <Tab.Pane eventKey="#link2" className='d-flex align-items-center flex-wrap justify-content-center'>
                            <Col md={4} className='mt-3 d-flex flex-column  justufy-content-center align-items-center'>
                                <Button style={{ width: 220 }} variant='outline-dark' className='mt-2 p2' onClick={() => setTypeVisible(true)}>Добавить тип</Button>
                                <Button style={{ width: 220 }} variant='outline-dark' className='mt-4 p2' onClick={() => setBrandVisible(true)}>Добавить бренд</Button>
                                <Button style={{ width: 220 }} variant='outline-dark' className='mt-4 p2' onClick={() => setProductVisible(true)}>Добавить продукт</Button>
                            </Col>
                            <Col md={4} className='mt-3 d-flex flex-column  justufy-content-center align-items-center' >
                                <Button style={{ width: 220 }} variant='outline-dark' className='mt-2 p2' onClick={() => setDeleteTypeVisible(true)} >Удалить тип</Button>
                                <Button style={{ width: 220 }} variant='outline-dark' className='mt-4 p2' onClick={() => setDeleteBrandVisible(true)} >Удалить бренд</Button>
                                <Button style={{ width: 220 }} variant='outline-dark' className='mt-4 p2' onClick={() => setDeleteProductVisible(true)} >Удалить продукт</Button>
                            </Col>
                            <Col md={4} className='mt-3 d-flex flex-column  justufy-content-center align-items-center' >
                                <Button style={{ width: 220 }} variant='outline-dark' className='mt-2 p2' onClick={() => setEditTypeVisible(true)} >Измененить тип</Button>
                                <Button style={{ width: 220 }} variant='outline-dark' className='mt-4 p2' onClick={() => setEditBrandVisible(true)} >Измененить бренд</Button>
                                {/* <Button style={{ width: 220 }} variant='outline-dark' className='mt-4 p2' onClick={() => setEditProductVisible(true)} >Измененить продукт</Button> */}
                            </Col>

                            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
                            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
                            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)} />

                            <DeleteType show={deleteTypeVisible} onHide={() => setDeleteTypeVisible(false)} />
                            <DeleteBrand show={deleteBrandVisible} onHide={() => setDeleteBrandVisible(false)} />
                            <DeleteProduct show={deleteProductVisible} onHide={() => setDeleteProductVisible(false)} />

                            <EditType show={editTypeVisible} onHide={() => setEditTypeVisible(false)} />
                            <EditBrand show={editBrandVisible} onHide={() => setEditBrandVisible(false)} />
                            <EditProduct show={editProductVisible} onHide={() => setEditProductVisible(false)} />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
})

export default Admin;