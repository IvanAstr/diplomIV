import { useCallback } from 'react';
import { $authHost, $host } from "./index";
import { useHttp } from "../hooks/http.hook";

// Создание корзины
export const useCreateBasket = () => {
  const { request } = useHttp();

  const createBasket = async () => {
    const { data } = await $authHost.post('/api/basket');
    return data;
  };

  return { createBasket };
};

// Получение информации о корзине
export const useFetchBasket = () => {
  const { request } = useHttp();

  const fetchBasket = useCallback(async (basketId) => {
    const { data } = await $host.get(`/api/basket/${basketId}`);
    return data;
  }, []);

  return { fetchBasket };
};

// Добавление товара в корзину
export const useAddProductToBasket = () => {
  const { request } = useHttp();

  const addProductToBasket = async (basketId, productId) => {
    const { data } = await $authHost.post(`/api/basket/${basketId}/add-product`, { productId });
    return data;
  };

  return { addProductToBasket };
};

// Удаление товара из корзины
export const useRemoveProductFromBasket = () => {
  const { request } = useHttp();

  const removeProductFromBasket = async (basketId, productId) => {
    const { data } = await $authHost.delete(`/api/basket/${basketId}/remove-product/${productId}`);
    return data;
  };

  return { removeProductFromBasket };
};
