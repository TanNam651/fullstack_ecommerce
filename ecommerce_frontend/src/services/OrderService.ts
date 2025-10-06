import axios from "axios";

export const OrderService = {
  CreateOrder: async (data: any) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/order",
        data,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': "application/json"
          }
        });

      return res.data
    } catch (error) {
      console.log("error")
    }
  },
  GetOrder: async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/order", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': "application/json",
        }
      });

      const result = await res.data;
      if (res.status === 200) {
        return {
          success: result.message,
          data: result
        }
      } else {
        return {
          error: result.error
        }
      }
    } catch (error) {
      return {
        error: "Error"
      }
    }
  },
  GetOrderDetail: async (id: string) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/order/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const result = await response.data;
      if (response.status === 200) {
        return {
          success: result.message,
          data: result.order
        }
      } else {
        return {
          error: result.error
        }
      }
    } catch (error) {
      return {
        error: "Error"
      }
    }
  },
  GetOrderStatus: async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/order-status", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const result = await response.data;
      if (response.status === 200) {
        return {
          success: "Success",
          data: result.status
        }
      } else {
        return {
          error: "Error"
        }
      }
    } catch (error) {
      return {
        error: "Error"
      }
    }
  }
}