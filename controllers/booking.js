const { Bookings, Users, Rooms } = require('../models');
const { Op } = require('sequelize');

let queryToSearch = {
  include: [
    {
      model: Users,
      required: true,
      attributes: ['id', 'username'],
    },
    {
      model: Rooms,
      required: true,
    },
  ],
  attributes: ['id', 'dateAndTime'],
  order: [['dateAndTime', 'DESC']],
};

module.exports = {
  async find(req, res, next) {
    try {
      const { date } = req.query;
      if (date) {
        queryToSearch.where = {
          dateAndTime: {
            [Op.between]: [date, `${date} 23:59:59`],
          },
        };
      }

      const bookings = await Bookings.findAll(queryToSearch);
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  },
  async findByUser(req, res, next) {
    try {
      const { id } = req.params;
      const d = new Date();
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      const date = `${year}-${month}-${day}`;
      const oneyear = `${year + 1}-${month}-${day}`;
      queryToSearch.where = {
        userid: id,
        dateAndTime: {
          [Op.between]: [date, oneyear],
        },
      };
      console.log();
      const bookings = await Bookings.findAll(queryToSearch);
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    try {
      const { id } = req.params;
      const booking = await Bookings.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Users,
            required: true,
          },
          {
            model: Rooms,
            required: true,
          },
        ],
      });
      if (!booking) {
        res.statusCode = 404;
        throw new Error('booking not found');
      }
      res.json(booking);
    } catch (error) {
      next(error);
    }
  },
  async add(req, res, next) {
    try {
      const {
        user: { id: userId },
      } = req.payload;
      const { roomId, dateAndTime } = req.body;
      const newBooking = {
        userId,
        dateAndTime,
        roomId,
      };
      const createBooking = await Bookings.create(newBooking);
      if (!createBooking) {
        throw new Error('fail create booking');
      }
      res.json({ message: 'booking created', createBooking });
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const booking = await Bookings.findOne({ where: { id } });
      if (!booking) {
        res.statusCode = 404;
        throw new Error('booking not found');
      }
      const deletedBooking = await booking.destroy();
      if (!deletedBooking) {
        throw new Error('delete booking fail');
      }
      res.json({
        message: 'booking deleted',
        deletedBooking,
      });
    } catch (error) {
      next(error);
    }
  },
};
