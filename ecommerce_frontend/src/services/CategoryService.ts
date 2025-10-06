const CategoryService = {
  GetListCategory: async (params) => {
    const query = new URLSearchParams(params).toString()
    // const filteredParams = Object.entries(params).filter(([_,v])=>v!=='' && v!==undefined && v!==null)
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/category/query-params/get-query?${query}`, {
        method: "GET",
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

      });

      if (!response.ok) {
        return {
          error: "Error",
          data: []
        }
      }

      const result = await response.json();
      return {
        success: result.message,
        data: result.data
      }

    } catch (error) {
      return {
        error: error,
        data: []
      }
    }
  },
  GetCategoryById: async (id: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/category/${id}`,{
        method:"GET",
        credentials:"include",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        return {
          data:[]
        }
      }

      const result= await response.json();
      return {
        data:result.data
      }

    } catch (error){
      return {
        data:[]
      }
    }
  },
  CreateCategory:async(data:any)=>{
    const formattedData = {
      name:data.name,
      slug:data.slug,
      parent_id:data.parentId,
      is_last:data.isLast
    }
    console.log("format: ",formattedData)
    const response = await fetch("http://127.0.0.1:8000/api/category",{
      method:"POST",
      credentials:"include",
      headers: {
        'Accept': "application/json",
        'Content-Type': "application/json"
      },
      body:JSON.stringify(formattedData)
    });
    const result = await response.json();
    const status =  response.status;
    if (status === 201){
      return {
        success:result.message,
        data:result.data
      }
    }
    return {error:result.message}
  },
  UpdateCategory: async (id:string,data:any)=>{
    const formattedData = {
      name:data.name,
      slug:data.slug,
      parent_id:data.parentId,
      is_last:data.isLast
    }
    const response = await fetch(`http://127.0.0.1:8000/api/category/${id}`,{
      method:"PUT",
      credentials:"include",
      headers:{
        'Accept': "application/json",
        'Content-Type': "application/json"
      },
      body:JSON.stringify(formattedData)
    });
    const result = await response.json();
    const status = response.status;
    if (status === 200){
      return {success:result.message};
    } else {
      return {error:result.message}
    }
  },
  DeleteCategory:async(id:string)=>{
    const response = await fetch(`http://127.0.0.1:8000/api/category/${id}`,{
      method:"DELETE",
      credentials:"include",
      headers:{
        'Accept': "application/json",
        'Content-Type': "application/json"
      }
    });

    const result = await response.json();
    const status = response.status;
    if (status===200){
      return {success:result.message}
    } else {
      return {error:result.message}
    }
  }
}
export default CategoryService;