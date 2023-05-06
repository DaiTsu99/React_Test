import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
  } from 'sequelize';

import sequelize from '../database';

const Test = sequelize.define('test', {
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
 export default Test;