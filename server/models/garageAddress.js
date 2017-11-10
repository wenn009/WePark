module.exports = (sequelize, DataTypes) => {
    const GarageAddress = sequelize.define('GarageAddress', {
        latitude: DataTypes.STRING,
        lontitude: DataTypes.STRING,
        country: DataTypes.STRING,
        city: DataTypes.STRING,
        streetName: DataTypes.STRING,
        zip: DataTypes.STRING
    });

    GarageAddress.associate = (models) => {
        models.GarageAddress.belongsTo(models.Garages);
    }

    return GarageAddress;
}