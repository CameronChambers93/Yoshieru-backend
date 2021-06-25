export default (sequelize, DataTypes) => {
  const Entry = sequelize.define('Entry', {
    ent_seq: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter the ent_seq'
      }
    },
    json: {
      type: DataTypes.JSON,
      allowNull: {
        args: false,
        msg: 'Please enter the json'
      }
    }
  }, {});
  Entry.associate = (models) => {
    // associations can be defined here
	Entry.belongsTo(models.Lookup, {
		foreignKey: 'ent_seq',
		onDelete: 'CASCADE'
	});
  };
  return Entry;
};