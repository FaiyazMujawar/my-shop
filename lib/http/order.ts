import axios from 'axios';
import FormData from 'form-data';

const BASE_URL = '/api/orders';

export async function createOrder(request: FormData) {
  const response = await axios.post(BASE_URL, request, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (response.status != 201) {
    throw new Error(response.data?.error);
  }
}
