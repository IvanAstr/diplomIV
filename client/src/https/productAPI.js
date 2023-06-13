import { useCallback } from 'react';
import { $authHost, $host } from "./index";
import { useHttp } from "../hooks/http.hook";
import DeleteBrand from '../components/modals/deleteBrand';

//#############__type__#############
export const useCreateType = () => {
  const { request } = useHttp();

  const createType = async (type) => {
    const {data} = $authHost.post('/api/type', type);
    return data;
  };

  return { createType };
};

export const useFetchType = () => {
  const { request } = useHttp();

  const fetchType = useCallback(async () => {
    const {data} = await $host.get('/api/type');
    return data;
  }, []);

  return { fetchType }; // Исправленное имя функции
};

//#############___brand___#############

export const useCreateBrand = () => {
    const { request } = useHttp();
  
    const createBrand = async (brand) => {
      const {data} = $authHost.post('/api/brand', brand);
      return data;
    };
  
    return { createBrand };
  };
  
  export const useFetchBrand = () => {
    const { request } = useHttp();
  
    const fetchBrand = useCallback(async () => {
      const {data} = await $host.get('/api/brand');
      return data;
    }, []);
  
    return { fetchBrand }; // Исправленное имя функции
  };


//#############__product__#############

  export const useCreateProduct = () => {
    const { request } = useHttp();
  
    const createProduct = async (product) => {
      const {data} = $authHost.post('/api/product', product);
      return data;
    };
  
    return { createProduct };
  };
  
  export const useFetchProduct = () => {
    const { request } = useHttp();
  
    const fetchProduct = useCallback(async (TypeId,BrandId,page, limit = 12) => {
      const {data} = await $host.get('/api/product',{params:{TypeId,BrandId,page,limit}});
      return data;
    }, []);
  
    return { fetchProduct }; // Исправленное имя функции
  };

  export const useFetchOneProduct = () => {
    const fetchOneProduct = async (id) => {
        try {
          const response = await $host.get('/api/product/' + id);
          const data = response.data;
          console.log("data::::");
          console.log(data);
          return data;
        } catch (error) {
          console.log(error);
          // Обработка ошибки
          return null;
        }
      };
  
    return { fetchOneProduct };
  };
  export const useAddProductInBasket = () => {
    const addProduct = async (basketId, productId) => {
        try {
          const response = await $authHost.post(`/api/product/${productId}`, {
            basketId,
            productId,
          });
          const data = response.data;
          return data;
        } catch (error) {
          console.log(error);
          // Обработка ошибки
          return null;
        }
      };
      
  
    return { addProduct };
  };