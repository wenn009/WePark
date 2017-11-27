module.exports = (sequelize, DataTypes) => {
    const Garages = sequelize.define('Garages',{
        Address: DataTypes.STRING,
        Renting_Price: DataTypes.DECIMAL(10,2),
        Size: DataTypes.STRING,
        Zip: DataTypes.INTEGER(5),
        Distance: DataTypes.INTEGER,
        Photos: DataTypes.ARRAY(DataTypes.STRING)
    });

    Garages.associate = (models) => {
        models.Garages.belongsTo(models.Users);
        models.Garages.hasMany(models.timeSheet);
    }

    return Garages;
}