import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
  } from 'sequelize';

  
const sequelize = new Sequelize('my_app', 'root', '', {
    dialect: 'mysql',
    host: 'localhost', 
    port: 3308
});

const Post = sequelize.define('post', {
    id: {
       type: DataTypes.INTEGER.UNSIGNED,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true,
    },
    message: {
       type: DataTypes.STRING,
    },
 });


const Raspberry = sequelize.define('raspberry', {
   id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   payload: {
      type: DataTypes.JSON,
   },
   client_id: {
      type: DataTypes.STRING,
   },
   timestamp: {
      type: DataTypes.BIGINT,
   }
});

export default sequelize;