module.exports = (sequelize, DataTypes) => {
    const Garages = sequelize.define('Garages',{
        Address: DataTypes.STRING,
        Renting_Price: DataTypes.DECIMAL(10,2),
        Size: DataTypes.STRING,
        Zip: DataTypes.INTEGER(5),
        Distance: DataTypes.INTEGER
    });

    Garages.associate = (models) => {
        models.Garages.belongsTo(models.Users);
    }

    return Garages;
}