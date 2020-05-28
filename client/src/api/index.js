import axios from 'axios';

const mainUrl = 'http://localhost:5000/api';

const strUserData = 'userData';
let userData =
  JSON.parse(localStorage.getItem(strUserData)) ||
  JSON.parse(sessionStorage.getItem(strUserData));
const defaultUserData = {
  role: 'norole',
  token: 'notoken',
};
const useData = userData ? userData : defaultUserData;
const token = useData.token === null ? 'notoken' : useData.token;

const config = {
  headers: {
    Authorization: 'Bearer ' + token,
  },
};

export default {
  async login(data) {
    const customUrl = `${mainUrl}/user/login`;
    return await axios.post(customUrl, data);
  },
  // ROOMS
  async getAssets() {
    const customUrl = `${mainUrl}/room/asset`;
    return await axios.get(customUrl);
  },
  async getRooms(query) {
    let customUrl = `${mainUrl}/room?`;
    if (query) {
      const { capacity, searchAssets } = query;
      if (capacity) {
        customUrl = `${customUrl}&capacity=${capacity}`;
      }
      if (searchAssets) {
        const strSearchAssets = JSON.stringify(searchAssets);
        customUrl = `${customUrl}&assets=${strSearchAssets}`;
      }
    }
    return await axios.get(customUrl, config);
  },
  async getRoom(id) {
    const customUrl = `${mainUrl}/room/${id}`;
    return await axios.get(customUrl, config);
  },
  async addRoom(data) {
    const customUrl = `${mainUrl}/room`;
    return await axios.post(customUrl, data, config);
  },
  async deleteRoom(id) {
    const customUrl = `${mainUrl}/room/${id}`;
    return await axios.delete(customUrl, config);
  },
  async updateRoom(id, data) {
    const customUrl = `${mainUrl}/room/${id}`;
    return await axios.patch(customUrl, data, config);
  },
  // USERS
  async getUsers() {
    const customUrl = `${mainUrl}/user`;
    return await axios.get(customUrl, config);
  },
  async addUser(data) {
    const customUrl = `${mainUrl}/user`;
    return await axios.post(customUrl, data, config);
  },
  async getUser(id) {
    const customUrl = `${mainUrl}/user/${id}`;
    return await axios.get(customUrl, config);
  },
  async updateUser(id, data) {
    const customUrl = `${mainUrl}/user/${id}`;
    return await axios.patch(customUrl, data, config);
  },
  async deleteUser(id) {
    const customUrl = `${mainUrl}/user/${id}`;
    return await axios.delete(customUrl, config);
  },
  // Booking
  async getBookings(query) {
    let customUrl = `${mainUrl}/booking`;
    const { date } = query;
    if (date) {
      customUrl = `${customUrl}?date=${date}`;
    }
    return await axios.get(customUrl, config);
  },
  async getBookingByUser(id) {
    let customUrl = `${mainUrl}/booking/user/${id}`;
    return await axios.get(customUrl, config);
  },
  async bookNow(data) {
    const customUrl = `${mainUrl}/booking`;
    return await axios.post(customUrl, data, config);
  },
};
