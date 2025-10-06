import {CloudinaryService} from "@/services/CloudinatyService.ts";
import {Cart} from "@/helpers/types.ts";
import {collectionFilter} from "@/routes/routes.ts";


export const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND'
});
export const getCookie = (name: string): string | null => {
  const values: string[] = document.cookie.split(';');
  for (const cookie of values) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) {
      return decodeURIComponent(value)
    }
  }
  return null
}

export const setLocal = (key: string, value: any) => {
  localStorage.setItem(key, value);
}

export const getLocal = (key: string) => {
  return localStorage.getItem(key);
}

export const removeLocal = (key: string) => {
  localStorage.removeItem(key);
}

export const getCartFromStore = (store: Storage = localStorage) => {
  const cart = store.getItem('cart');
  if (cart) return JSON.parse(cart);
  return {};
}

export const validateImageUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'blob:';

  } catch (error) {
    return false;
  }
}

export const convertProductDescription = async (description: string) => {
  const matches = [...description.matchAll(/<img[^>]+src="(data:image\/[^"]+)"[^>]*>/g)];

  const uploads = await Promise.all(
    matches.map(async (match) => {
      const uploaded = await CloudinaryService.UploadBase64(match[1]);
      return {base64: match[1], url: uploaded}
    })
  );

  let finalDes = description;
  for (const {base64, url} of uploads) {
    if (url) finalDes = finalDes.replace(base64, url);
  }
  return finalDes;
}

export const convertViToEn = (text: string) => {
  text.repeat()
  return text.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")                  // Replace đ with d
    .replace(/Đ/g, "D")
    .toLowerCase();
}

export const underline = (str: string) => {
  return str.toLowerCase().replaceAll('-', '_')
}

export const getFilterByKey = (key: string) => {
  const convertKey = underline(key)
  return collectionFilter.find((item) => Object.keys(item)[0] === convertKey)?.[convertKey];
}