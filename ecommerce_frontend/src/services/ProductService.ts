import axios from "axios";
import {CloudinaryService} from "@/services/CloudinatyService.ts";
import {convertProductDescription} from "@/helpers/utils.ts";

export const ProductService = {
  GetProducts: async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/product", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    const result = await res.data;
    if (res.status === 200) {

      return {
        success: result.message,
        data: result.data
      }
    }
    return {
      error: result.message,
      data: []
    }
  },

  CreateProduct: async (data: any) => {
    const imageProduct = await CloudinaryService.UploadImage([data.imageUrl]);
    const hoverImage = await CloudinaryService.UploadImage([data.hoverImage]);
    const thumbnails = await CloudinaryService.UploadImage(data.thumbnails);

    const updatedDes = await convertProductDescription(data.description);

    const formattedProduct = {
      name: data.name,
      slug: data.name.trim().toLowerCase().replace(/\s+/g, '-'),
      is_featured: data.isFeatured,
      is_archived: data.isArchived,
      origin_price: data.originPrice,
      sale_price: data.salePrice,
      student_price: data.studentPrice,
      quantity: data.quantity,
      description: updatedDes,
      image_url: imageProduct[0],
      hover_image: hoverImage[0],
      category_id: data.categoryId,
      thumbnails: thumbnails
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/product",
        formattedProduct,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': "application/json",
          }
        });

      const result = await res.data;
      if (res.status === 201) {
        return {
          success: "Product created",
          data: result
        }
      }

      return {
        error: "Error",
        data: result
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error("Validation errors:", error.response.data.errors);
        return {
          error: "Validation failed",
          validationErrors: error.response.data.errors,
        };
      }
    }
  },
  UpdateProduct: async (id: string, data: any) => {
    const imageProduct = await CloudinaryService.UploadImage([data.imageUrl]);
    const hoverImage = await CloudinaryService.UploadImage([data.hoverImage]);
    const thumbnails = await CloudinaryService.UploadImage(data.thumbnails);

    const updatedDes = await convertProductDescription(data.description);

    const formattedProduct = {
      name: data.name,
      slug: data.name.trim().toLowerCase().replace(/\s+/g, '-'),
      is_featured: data.isFeatured,
      is_archived: data.isArchived,
      origin_price: data.originPrice,
      sale_price: data.salePrice,
      student_price: data.studentPrice,
      quantity: data.quantity,
      description: updatedDes,
      image_url: imageProduct[0],
      hover_image: hoverImage[0],
      category_id: data.categoryId,
      thumbnails: thumbnails
    }

    try {
      const res = await axios.put(`http://127.0.0.1:8000/api/product/${id}`,
        formattedProduct,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': "application/json",
          }
        });

      const result = await res.data;
      if (res.status === 200) {
        return {
          success: result.message,
        }
      }
      return {
        error: result.message,
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error("Validation errors:", error.response.data.errors);
        return {
          error: "Validation failed",
          validationErrors: error.response.data.errors,
        };
      }
    }
  },
  GetProductBySlug: async (slug: string) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/product/slug/${slug}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      const result = await response.data;
      if (response.status === 200) {
        return {
          success: result.message,
          data: result.data ?? []
        }
      }
      return {
        error: result.message,
        data: []
      }
    } catch (error) {
      return {
        error: "Error",
        data: []
      }
    }
  },
  GetProductByParams: async (query: string) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/product/query-params/get-query?${query}`, {
      headers: {
        'Accept': 'application/json',
      }
    });

    const result = res.data;
    if (res.status === 200) {
      return {
        products: result.products
      }
    }
    return {
      products: []
    }
  },
  GetProductBySearch: async (search: string) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/product/search?search=${search}`,
      {
        headers: {
          'Accept': 'application/json',
        }
      });

    const result = res.data;
    if (res.status === 200) {
      return {
        success: result.status,
        products: result.products,
        total: result.total
      }
    }
    return {
      error: result.status,
      products: []
    }
  }
}