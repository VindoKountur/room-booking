const user = [
  {
    username: 'admin',
    password: 'admin',
    role: 'admin',
  },
  {
    username: 'user',
    password: 'user',
    role: 'user',
  },
];

const room = [
  {
    name: 'meeting room 1',
    description: 'this is a description',
    capacity: 10,
    assets: 'table, chair, tv',
  },
  {
    name: 'meeting room 2',
    description: 'this is a description 2',
    capacity: 9,
    assets: 'table, chair, tv, playstation',
  },
  {
    name: 'meeting room 3',
    description: 'this is a description 3',
    capacity: 8,
    assets: 'table, chair',
  },
  {
    name: 'meeting room 4',
    description: 'this is a description 4',
    capacity: 7,
    assets: 'pc, water, monitor',
  },
];

const booking = [
  {
    userId: 2,
    dateAndTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
    roomId: 1,
  },
];

module.exports = {
  user,
  room,
  booking,
};
