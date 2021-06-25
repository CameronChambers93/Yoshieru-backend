module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lookups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ent_seq: {
        type: Sequelize.INTEGER
      },
      k_ele: {
        type: Sequelize.TEXT
      },
      word_type: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface /* , Sequelize */ => queryInterface.dropTable('lookups')
};