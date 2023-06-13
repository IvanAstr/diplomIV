import React, {useState} from 'react';
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

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)
    const [deleteProductVisible, setDeleteProductVisible] = useState(false)
    const [deleteBrandVisible, setDeleteBrandVisible] = useState(false)
    const [deleteTypeVisible, setDeleteTypeVisible] = useState(false)
    const [editTypeVisible, setEditTypeVisible] = useState(false)
    const [editBrandVisible, setEditBrandVisible] = useState(false)
    const [editProductVisible, setEditProductVisible] = useState(false)
    return (
        <Container className='d-flex flex-row mt-5 flex-wrap justify-content-center' >
            <Col md={4} className='mt-3 d-flex flex-column ml-2 justufy-content-center align-items-center'>
                <h3 className='mt-5'>Добовление</h3>
                <Button style={{width:220}} variant='outline-dark' className='mt-2 p2' onClick={()=>setTypeVisible(true)}>Добваить тип</Button>
                <Button style={{width:220}} variant='outline-dark' className='mt-4 p2' onClick={()=> setBrandVisible(true)}>Добавить бренд</Button>
                <Button style={{width:220}} variant='outline-dark' className='mt-4 p2' onClick={()=> setProductVisible(true)}>Добавить продукт</Button>
            </Col>
            <Col md={4} className='mt-3 d-flex flex-column ml-2 justufy-content-center align-items-center' >
                <h3 className='mt-5'>Удаление</h3>
                <Button style={{width:220}} variant='outline-dark' className='mt-2 p2' onClick={()=>setDeleteTypeVisible(true)} >Удалить тип</Button>
                <Button style={{width:220}} variant='outline-dark' className='mt-4 p2' onClick={()=>setDeleteBrandVisible(true)} >Удалить бренд</Button>
                <Button style={{width:220}} variant='outline-dark' className='mt-4 p2' onClick={()=>setDeleteProductVisible(true)} >Удалить продукт</Button>
            </Col>
            <Col md={4} className='mt-3 d-flex flex-column ml-2 justufy-content-center align-items-center' >
                <h3 className='mt-5'>Изменение</h3>
                <Button style={{width:220}} variant='outline-dark' className='mt-2 p2' onClick={()=>setEditTypeVisible(true)} >Измененить тип</Button>
                <Button style={{width:220}} variant='outline-dark' className='mt-4 p2' onClick={()=>setEditBrandVisible(true)} >Измененить бренд</Button>
                <Button style={{width:220}} variant='outline-dark' className='mt-4 p2' onClick={()=>setEditProductVisible(true)} >Измененить продукт</Button>
            </Col>

            <CreateType show={typeVisible} onHide={()=> setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={()=> setBrandVisible(false)}/>
            <CreateProduct show={productVisible} onHide={()=> setProductVisible(false)}/> 
            
            <DeleteType show={deleteTypeVisible} onHide={()=> setDeleteTypeVisible(false)}/>
            <DeleteBrand show={deleteBrandVisible} onHide={()=> setDeleteBrandVisible(false)}/>
            <DeleteProduct show={deleteProductVisible} onHide={()=> setDeleteProductVisible(false)}/> 
            
            <EditType show={editTypeVisible} onHide={()=> setEditTypeVisible(false)}/>
            <EditBrand show={editBrandVisible} onHide={()=> setEditBrandVisible(false)}/>
            <EditProduct show={editProductVisible} onHide={()=> setEditProductVisible(false)}/> 
            

        </Container>
    )
}

export default Admin;