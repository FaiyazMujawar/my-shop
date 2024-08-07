import { AddService } from '~/types/service';
import axios from 'axios';

const BASE_URL = '/api/services';

export async function createService(request: AddService) {
  const response = await axios.post(BASE_URL, request);
  if (response.status != 201) {
    throw new Error(response.data.error);
  }
}
