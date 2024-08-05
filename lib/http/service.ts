import { Service } from '@custom-types/service';
import axios from 'axios';

const BASE_URL = '/api/services';

export async function createService(request: Service) {
  const response = await axios.post(BASE_URL, request);
  if (response.status != 201) {
    throw new Error(response.data.error);
  }
}
