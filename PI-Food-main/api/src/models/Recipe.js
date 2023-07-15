const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
        this.setDataValue("title",value.toLowerCase())
      }},

    image:{type: DataTypes.TEXT,
      allowNull: false},

    healthScore:{type: DataTypes.INTEGER,
      allowNull: false},

    summary:{type: DataTypes.TEXT,
      allowNull: false},

    instructions:{type: DataTypes.TEXT,
      allowNull: false},   

  },{timestamps:false});
};

