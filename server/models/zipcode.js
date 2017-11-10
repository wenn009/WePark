module.exports = (sequelize, DataTypes) => {
    const ZipCode = sequelize.define('ZipCode');

    ZipCode.associate = (models) => {
        models.ZipCode.hasMany(models.GarageAddress);
    }

    return ZipCode; 
}

