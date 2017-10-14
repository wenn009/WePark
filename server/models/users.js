module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users',{
        FirstName: DataTypes.STRING,
        LastName: DataTypes.STRING,
        UserType: DataTypes.STRING,
        PhoneNumber: DataTypes.STRING,
        Address: DataTypes.STRING,
        Email: DataTypes.STRING(320)
    });

    Users.associate = (models) => {
        models.Users.hasMany(models.Garages);
    }

    return Users;
}