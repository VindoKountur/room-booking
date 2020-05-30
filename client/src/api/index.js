import axios from 'axios';

const mainUrl = 'http://localhost:5000/api';

const strUserData = 'userData';
function setConfig() {
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
  return config;
}
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
    return await axios.get(customUrl, setConfig());
  },
  async getRoom(id) {
    const customUrl = `${mainUrl}/room/${id}`;
    return await axios.get(customUrl, setConfig());
  },
  async addRoom(data) {
    const customUrl = `${mainUrl}/room`;
    return await axios.post(customUrl, data, setConfig());
  },
  async deleteRoom(id) {
    const customUrl = `${mainUrl}/room/${id}`;
    return await axios.delete(customUrl, setConfig());
  },
  async updateRoom(id, data) {
    const customUrl = `${mainUrl}/room/${id}`;
    return await axios.patch(customUrl, data, setConfig());
  },
  // USERS
  async getUsers() {
    const customUrl = `${mainUrl}/user`;
    return await axios.get(customUrl, setConfig());
  },
  async addUser(data) {
    const customUrl = `${mainUrl}/user`;
    return await axios.post(customUrl, data, setConfig());
  },
  async getUser(id) {
    const customUrl = `${mainUrl}/user/${id}`;
    return await axios.get(customUrl, setConfig());
  },
  async updateUser(id, data) {
    const customUrl = `${mainUrl}/user/${id}`;
    return await axios.patch(customUrl, data, setConfig());
  },
  async deleteUser(id) {
    const customUrl = `${mainUrl}/user/${id}`;
    return await axios.delete(customUrl, setConfig());
  },
  // Booking
  async getBookings(query) {
    let customUrl = `${mainUrl}/booking`;
    const { date } = query;
    if (date) {
      customUrl = `${customUrl}?date=${date}`;
    }
    return await axios.get(customUrl, setConfig());
  },
  async getBookingByUser(id) {
    let customUrl = `${mainUrl}/booking/user/${id}`;
    return await axios.get(customUrl, setConfig());
  },
  async bookNow(data) {
    const customUrl = `${mainUrl}/booking`;
    return await axios.post(customUrl, data, setConfig());
  },
};
