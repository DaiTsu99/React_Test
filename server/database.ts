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

// class Post extends Model<
//   InferAttributes<Post>,
//   InferCreationAttributes<Post>
// > {
// //   declare userId: ForeignKey<User['id']>;
//   declare message: string;

//   // createdAt can be undefined during creation
//   declare createdAt: CreationOptional<Date>;
//   // updatedAt can be undefined during creation
//   declare updatedAt: CreationOptional<Date>;
// }

// Post.init(
//     {
//       message: {
//         type: new DataTypes.STRING(128),
//         allowNull: false
//       },
//       createdAt: DataTypes.DATE,
//       updatedAt: DataTypes.DATE,
//     },
//     {
//       tableName: 'post',
//       sequelize // passing the `sequelize` instance is required
//     }
//   );



export default sequelize;