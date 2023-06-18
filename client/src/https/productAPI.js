import { useCallback } from 'react';
import { $authHost, $host } from "./index";
import { useHttp } from "../hooks/http.hook";
import DeleteBrand from '../components/modals/deleteBrand';

//#############__type__#############
export const useCreateType = () => {
  const { request } = useHttp();

  const createType = async (type) => {
    const {data} = $authHost.post('/api/type/create', type);
    return data;
  };

  return { createType };
};
export const useDeleteType = () => {
  const { request } = useHttp();

  const deleteType = async (typeId) => {
    console.log('deleteType', typeId.typeId)
    const {data} = $authHost.delete(`/api/type/delete/${typeId.typeId}`);
    return data;
  };

  return { deleteType };
};

export const useUpdateType = () => {
  const { request } = useHttp();

  const updateType = async (type, name) => {
    console.log("type: ",name)
    const {data} = $authHost.put(`/api/type/update/${type}`, {name});
    return data;
  };

  return { updateType };
};

export const useFetchType = () => {
  const { request } = useHttp();

  const fetchType = useCallback(async () => {
    const {data} = await $host.get('/api/type/all');
    return data;
  }, []);

  return { fetchType }; // Исправленное имя функции
};

//#############___brand___#############

export const useCreateBrand = () => {
    const { request } = useHttp();
  
    const createBrand = async (brand) => {
      const {data} = $authHost.post('/api/brand/create', brand);
      return data;
    };
  
    return { createBrand };
  };
  
  export const useDeleteBrand = () => {
    const { request } = useHttp();
  
    const deleteBrand = async (brand) => {
      const {data} = $authHost.delete(`/api/brand/delete/${brand.id}`);
      return data;
    };
  
    return { deleteBrand };
  };

  export const useUpdateBrand = () => {
    const { request } = useHttp();
  
    const updateBrand = async (brand, name) => {
      console.log("brand: ", name)

      const {data} = $authHost.put(`/api/brand/update/${brand}`, {name});
      return data;
    };
  
    return { updateBrand };
  };

  export const useFetchBrand = () => {
    const { request } = useHttp();
  
    const fetchBrand = useCallback(async () => {
      const {data} = await $host.get('/api/brand/all');
      return data;
    }, []);
  
    return { fetchBrand }; // Исправленное имя функции
  };


//#############__product__#############

  export const useCreateProduct = () => {
    const { request } = useHttp();
  
    const createProduct = async (product) => {
      const {data} = $authHost.post('/api/product/create', product);
      return data;
    };
  
    return { createProduct };
  };

  export const useDeleteProduct = () => {
    const { request } = useHttp();
  
    const deleteProduct = async (product) => {
      const {data} = $authHost.delete(`/api/product/delete/${product.id}`);
      return data;
    };
  
    return { deleteProduct };
  };
  
  export const useFetchProduct = () => {
    const { request } = useHttp();
  
    const fetchProduct = useCallback(async (TypeId,BrandId,page, limit = 12) => {
      const {data} = await $host.get('/api/product/all',{params:{TypeId,BrandId,page,limit}});
      console.log(":hjhkjh ",data)
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