import axios from "axios";
import { imgUploadURL } from "app/constants/urls";

export class ImageServer {
  public async uploadImage(file: File) {
    const base64Data = await this.readFile(file);
    const authKey = process.env.REACT_APP_IMGUR_CLIENT_ID ?? "b5d0a008cf519a1";

    const response = await axios.post(
      imgUploadURL,
      { image: base64Data },
      {
        headers: {
          Authorization: `Client-ID ${authKey}`,
        },
      }
    );
    return response.data.data.link;
  }

  private readFile(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async (e) => {
        const base64Data = (reader.result as string).substring(
          (reader.result as string).indexOf(",") + 1
        );
        resolve(base64Data);
      };

      reader.onerror = () => {
        reject();
      };
    });
  }
}
