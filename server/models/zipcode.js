module.exports = (sequelize, DataTypes) => {
    const ZipCode = sequelize.define('ZipCode', {
        zip: DataTypes.STRING
    });

    ZipCode.associate = (models) => {
        models.ZipCode.hasMany(models.GarageAddress);
    }

    return ZipCode; 
}

