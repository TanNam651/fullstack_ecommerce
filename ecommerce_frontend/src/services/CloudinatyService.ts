import {FileWithPreview} from "@/components/ui/upload-image.tsx";
import {validateImageUrl} from "@/helpers/utils.ts";
import axios from "axios";

export const CloudinaryService = {
  UploadImage: async (data: FileWithPreview[]) => {
    const listStyleImage = [];
    for (const image of data) {
      const validUrl = image.url;
      if (validateImageUrl(validUrl) && image.file) {
        const formData = new FormData();
        formData.append('file', image.file);
        formData.append('upload_preset', 'vkvx0mw2');

        try {
          const res = await axios.post('https://api.cloudinary.com/v1_1/ddicfhjuz/image/upload', formData);
          if (res.data.secure_url) {
            listStyleImage.push(res.data.secure_url)
          }
        } catch (error) {
          console.log("Upload fail", error);
          throw new Error("Image upload fail")
        }
      } else {
        listStyleImage.push(validUrl)
      }
    }
    return listStyleImage;
  },
  UploadBase64: async (data: string) => {
    const formData = new FormData();
    formData.append('file', data);
    formData.append('upload_preset', 'vkvx0mw2');

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/ddicfhjuz/image/upload', formData);
      if (res.data.secure_url) {
        return res.data.secure_url
      }
      return null;
    } catch (error) {
      console.error('Upload failed', error);
      return null;
    }
  }
}