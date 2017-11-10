module.exports = (sequelize, DataTypes) => {
    const TimeSheet = sequelize.define('TimeSheet', {

    });

    TimeSheet.associate = (models) => {
        models.TimeSheet.hasMany(models.TimeSlot);
        models.TimeSheet.belongsTo(models.Garages);
    }

    return TimeSheet;
}