module.exports = (sequelize, DataTypes) => {
    const timeSlot = sequelize.define('timeSlot', {
        StartTime: DataTypes.DATE,
        EndTime: DataTypes.DATE
    });

    timeSlot.associate = (models) => {
        models.timeSlot.belongsTo(models.timeSheet);
        // models.TimeSlot.belongsTo(models.UserRecord);
    }
    return timeSlot;
}