import { HttpService } from './HttpService';

const BE_URL = process.env.BE_URL || 'http://localhost:3002';

class BeServices extends HttpService {
  constructor() {
    super(`${BE_URL}`);
  }

  async addGuards(guards) {
    return this.post('/guards', { guards });
  }

  async getGuards(params = { test: '123' }) {
    const searchParams = new URLSearchParams(params).toString();
    return this.get(`/guards?${searchParams}`);
  }
}

export const beServices = new BeServices();
