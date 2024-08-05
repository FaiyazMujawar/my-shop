import { Service } from '@custom-types/service';
import axios from 'axios';

export async function createService(request: Service) {
  const response = await axios.post('/api/services', request);
  if (response.status != 201) {
    throw new Error(response.data.error);
  }
}
