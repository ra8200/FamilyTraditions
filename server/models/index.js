const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const User = require('./userModel')(sequelize, Sequelize.DataTypes);
const Recipe = require('./recipesModel')(sequelize, Sequelize.DataTypes);
const RecipeBook = require('./recipeBookModel')(sequelize, Sequelize.DataTypes);

User.hasMany(RecipeBook, { foreignKey: 'author_id' });
RecipeBook.belongsTo(User, { foreignKey: 'author_id' });

User.hasMany(Recipe, { foreignKey: 'creator_id' });
Recipe.belongsTo(User, { foreignKey: 'creator_id' });

RecipeBook.hasMany(Recipe, { foreignKey: 'recipe_book_id' });
Recipe.belongsTo(RecipeBook, { foreignKey: 'recipe_book_id' });

const db = {
  sequelize,
  Sequelize,
  User,
  Recipe,
  RecipeBook,
};

module.exports = db;