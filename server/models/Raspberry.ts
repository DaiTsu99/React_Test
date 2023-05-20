import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
  } from 'sequelize';

import sequelize from '../database';

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

 export default Raspberry