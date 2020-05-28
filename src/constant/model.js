const stringnotnull = (DataTypes, unique = false) => ({
  type: DataTypes.STRING,
  allowNull: false,
  unique: unique,
});

const intnotnull = (DataTypes) => ({
  type: DataTypes.INTEGER,
  allowNull: false,
});

const datenotnull = (DataTypes) => ({
  type: DataTypes.DATE,
  allowNull: false,
});

module.exports = {
  stringnotnull,
  intnotnull,
  datenotnull,
};
