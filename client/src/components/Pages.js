import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Pagination } from "react-bootstrap";

const Pages = observer(()=>{
    const {product} = useContext(Context);
    console.log('totalCount')
    console.log(product.totalCount)
    console.log('limit')
    console.log(product.limit)
    const pageCount = Math.ceil(product.totalCount / 12);
    const pages = [];
    for(let i = 0; i < pageCount; i++) {
        pages.push(i+1)
    }
    return(
        <Pagination className="mt-5">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={product.page === page}
                    onClick={()=> product.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    )
});

export default Pages;