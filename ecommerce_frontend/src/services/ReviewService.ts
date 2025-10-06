import axios from "axios";

const ReviewService = {
  CreateReview: async (data: any) => {
    const formattedReview = {
      product_id: data.productId,
      email: data.email,
      name: data.name,
      status: data.status,
      phone: data.phone,
      rating: data.rating,
      review: data.review,
      parent_id: data.parent_id
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/review",
        formattedReview,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      const result = await res.data;
      if (res.status === 201) {
        return {
          success: result.success,
          data: result.review
        }
      }

      return {
        error: "Error",
        data: result
      }
    } catch (error) {
      return {
        error: "Error",
      }
    }
  },
  GetReviews: async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/review",
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
      const result = await res.data;
      if (res.status === 200) {
        return {
          success: result.success,
          reviews: result.reviews
        }
      }

      return {
        error: result.error,
        message: result.message
      }
    } catch (error) {
      return {
        error: "Error",
        message: "Error"
      }
    }
  }
}

export default ReviewService