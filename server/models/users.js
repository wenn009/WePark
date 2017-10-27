const bcrypy = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        FirstName: DataTypes.STRING,
        LastName: DataTypes.STRING,
        UserType: DataTypes.STRING,
        PhoneNumber: DataTypes.STRING,
        Address: DataTypes.STRING,
        Email: DataTypes.STRING(320),
        password_hash: DataTypes.STRING
    });

    Users.beforeCreate((user) =>
        new sequelize.Promise((resolve) => {
            bcrypt.hash(user.password_hash, null, null, (err, hashedPassword) => {
                resolve(hashedPassword);
            });
        })
            .then((hashedPassword) => {
                user.password_hash = hashedPassword;
            })
    );
    Users.associate = (models) => {
        models.Users.hasMany(models.Garages);
    }

    return Users;
}