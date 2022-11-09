import { toast } from 'react-toastify';
import client from './client.config';

interface FileUploadResponse {
  location: string;
}

async function uploadImage(
  authKey: string,
  blob: Blob,
  fileName: string
): Promise<string> {
  try {
    const form = new FormData();
    form.append('file', blob, fileName);
    const response = await client.request({
      url: '/file-upload',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authKey}`,
        'Content-Type': 'multipart/form-data',
      },
      data: form,
    });
    const parsed = response.data as FileUploadResponse;
    return parsed.location;
  } catch (e) {
    toast.error('Failed to upload file');
  }

  return '';
}

export default uploadImage;
