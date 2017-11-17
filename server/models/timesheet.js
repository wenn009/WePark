module.exports = (sequelize, DataTypes) => {
    const timeSheet = sequelize.define('timeSheet');

    timeSheet.associate = (models) => {
        models.timeSheet.hasMany(models.timeSlot);
        models.timeSheet.belongsTo(models.Garages);
    }

    return timeSheet;
}