import { HttpService } from './HttpService';

const BE_URL = process.env.BE_URL || 'http://localhost:3002';

class BeServices extends HttpService {
  constructor() {
    super(`${BE_URL}`);
  }

  async addGuards(guards) {
    return this.post('/guards', { guards });
  }

  async getGuards(params = { }) {
    const searchParams = new URLSearchParams(params).toString();
    return this.get(`/guards?${searchParams}`);
  }

  async addShifts(shifts) {
    return this.post('/shifts', { shifts });
  }

  async getShifts(params = { }) {
    const searchParams = new URLSearchParams(params).toString();
    return this.get(`/shifts?${searchParams}`);
  }
}

export const beServices = new BeServices();
