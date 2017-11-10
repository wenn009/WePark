module.exports = (sequelize, DataTypes) => {
    const TimeSlot = sequelize.define('TimeSlot', {
        StartTime: DataTypes.DATE,
        EndTime: DataTypes.DATE
    });

    TimeSlot.associate = (models) => {
        models.TimeSlot.belongsTo(models.TimeSheet);
        models.TimeSlot.belongsTo(models.UserRecord);
    }

    return TimeSlot;
}