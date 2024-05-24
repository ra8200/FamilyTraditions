module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipe_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    instructions: {
      type: DataTypes.TEXT,
    },
    recipe_book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'recipe_books',
        key: 'recipe_book_id',
      },
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      },
    },
    image_url: {
      type: DataTypes.STRING,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    last_updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Recipe;
};