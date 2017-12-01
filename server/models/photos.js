module.exports = (sequelize, DataTypes) => {
    const Photos = sequelize.define('Photos', {
        URL: DataTypes.STRING
    });

    Photos.associate = (models) => {
        models.Photos.belongsTo(models.Garages);
    }

    return Photos;
}