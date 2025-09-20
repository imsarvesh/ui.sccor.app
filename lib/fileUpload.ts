import Axios from "axios";

const upload =
  (token: string, endpoint: string) =>
  async (uri: string): Promise<string> => {
    try {
      // Get the file extension
      const extension = uri.split(".").pop()?.toLowerCase();
      const contentType = extension === "png" ? "image/png" : "image/jpeg";

      // Create form data
      const formData = new FormData();
      formData.append("file", {
        uri,
        type: contentType,
        name: `${Date.now()}.jpg`,
      } as any);

      // Make the upload request
      const response = await Axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.fileUrl;
    } catch (error) {
      return error;
    }
  };

export default upload;
