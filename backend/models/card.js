module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define(
    "Card",
    {
      location: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      averageTemperture: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      lowestTemperture: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      highestTemperture: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      rainfall: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      snowfall: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      averageWindSpeed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      huminity: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      sunnyHour: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      cloudy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      weather: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      startYear: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      endYear: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );
  Card.associate = db => {
    db.Card.belongsTo(db.User);
  };
  return Card;
};
