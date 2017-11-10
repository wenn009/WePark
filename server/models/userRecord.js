module.exports = (sequelize, DataTypes) => {
    const UserRecord = sequelize.define('UserRecord');

    UserRecord.associate = (models) => {
        models.UserRecord.hasMany(models.TimeSlot);
    };

    return UserRecord;
}
