module.exports = (sequelize, DataTypes) => {
    const userRecord = sequelize.define('userRecord');

    userRecord.associate = (models) => {
        models.userRecord.hasMany(models.timeSlot);
    };

    return userRecord;
}
