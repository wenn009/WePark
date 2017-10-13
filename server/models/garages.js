module.exports = (sequelize, DataTypes) => {
    const Garages = sequelize.define('Garages',{
        Address: DataTypes.STRING,
        Renting_Price: DataTypes.DOUBLE(10,2),
        Size: DataTypes.STRING
    });

    Garages.associate = (models) => {
        models.Garages.belongsTo(models.Users);
    }

    return Garages;
}