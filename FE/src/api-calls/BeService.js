import { HttpService } from './HttpService';

const BE_URL = process.env.BE_URL || 'http://localhost:3002';

/**
 * Processed Order API Service
 */
class BeServices extends HttpService {
  constructor() {
    super(`${BE_URL}`);
  }

  /**
   * Cancels processed order
   * @param processedOrderId {string} - order to cancel
   * @param comment {string} - reason to cancel order
   * @returns Promise<*>
   */
  async addGuards(guards) {
    return this.post('/guards/post', { guards });
  }
}

export const beServices = new BeServices();
