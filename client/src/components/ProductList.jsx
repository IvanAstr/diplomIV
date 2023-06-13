import React, { useContext, useState } from 'react';
import Row from 'react-bootstrap/Row';
import { observer } from 'mobx-react-lite'
import { Context } from '../index';
import ProductItem from './ProductItem';

const ProductList = observer(() => {
  const { product } = useContext(Context);
  const [searchValue, setSearchValue] = useState('');

  // Функция для обработки изменения значения поиска
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Фильтрация продуктов на основе значения поиска
  const filteredProducts = product.products.filter((product) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <div className="mb-3">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Поиск по названию"
          style={{
            width: '300px',
            padding: '10px',
            marginTop: '10px',
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
          }}
        />
      </div>
      <Row className="d-flex">
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Row>
    </>
  );
});

export default ProductList;