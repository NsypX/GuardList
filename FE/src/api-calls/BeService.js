import { HttpService } from './HttpService';

const BE_URL = process.env.BE_URL || 'http://localhost:3002';

class BeServices extends HttpService {
  constructor() {
    super(`${BE_URL}`);
  }

  //#region Guards
  async addGuards(guards) {
    return this.post('/guards', { guards });
  }

  async getGuards(params = { }) {
    const searchParams = new URLSearchParams(params).toString();
    return this.get(`/guards?${searchParams}`);
  }

  async deactivateGuards(guardId) {    
    return this.put(`/guards/deactivate/${guardId}`);
  }

  //#endregion Guards

  //#region Shifts

  async addShifts(shifts) {
    return this.post('/shifts', { shifts });
  }

  async getShifts(params = { }) {
    const searchParams = new URLSearchParams(params).toString();
    return this.get(`/shifts?${searchParams}`);
  }

  async deactivateShifts(shiftGroupId) {    
    return this.put(`/shifts/deactivate/${shiftGroupId}`);
  }
  
  //#endregion Shifts
}

export const beServices = new BeServices();
