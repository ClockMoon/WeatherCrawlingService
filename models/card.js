module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define(
    "Card",
    {
      location: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
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
      rainFall: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      snowFall: {
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
      dayLightTime: {
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
      startYears: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      endYears: {
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
