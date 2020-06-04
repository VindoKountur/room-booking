const models = require('../models');
const { Op } = require('sequelize');

const Rooms = models.Rooms;

async function checkExisting(id, res) {
  const room = await Rooms.findOne({
    where: {
      id,
    },
  });
  if (!room) {
    res.statusCode = 400;
    throw new Error('Id not found');
  }
  return room;
}

module.exports = {
  add(req, res, next) {
    const data = req.body;
    Rooms.build(data)
      .save()
      .then((insertedData) => {
        res.json({
          message: 'inserted',
          insertedData,
        });
      })
      .catch((error) => {
        res.statusCode = '400';
        next(error);
      });
  },
  async find(req, res, next) {
    try {
      const { capacity, assets } = req.query;
      let condition = {
        where: {},
      };
      if (capacity) {
        condition.where.capacity = {
          [Op.lte]: capacity,
        };
      }
      if (assets) {
        const parseAssets = JSON.parse(assets);
        const searchAssets = parseAssets.map((asset) => ({
          [Op.substring]: asset,
        }));
        condition.where.assets = {
          [Op.and]: searchAssets,
        };
      }
      console.log(condition);
      const rooms = await Rooms.findAll(condition);
      res.json(rooms);
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    try {
      const { id } = req.params;
      const room = await checkExisting(id, res);
      res.json(room);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const body = req.body;
      const room = await checkExisting(id, res);
      const updatedRoom = await room.update(body);
      res.json({ message: 'updated', updatedRoom });
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const room = await checkExisting(id, res);
      const deletedRoom = await room.destroy();
      res.json({ message: 'deleted', deletedRoom });
    } catch (error) {
      next(error);
    }
  },
  async getAsset(req, res, next) {
    try {
      let assets = [];
      const roomsAssets = await Rooms.findAll({
        attributes: ['assets'],
      });
      roomsAssets.map((data) => {
        const arrAsset = data.assets.split(',');
        arrAsset.map((str) => {
          assets.push(str.trim());
        });
      });
      const fixAssets = [...new Set(assets)];
      res.json(fixAssets);
    } catch (error) {
      next(error);
    }
  },
};
