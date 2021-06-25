export default (sequelize, DataTypes) => {
  const Lookup = sequelize.define('Lookup', {
    ent_seq: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
      }
    },
    k_ele: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
      }
    },
	word_type: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
      }
    }
  }, { freezeTableName: true});
  Lookup.associate = (models) => {
    // associations can be defined here
	Lookup.hasOne(models.Entry, {
		foreignKey: 'ent_seq',
	});
  };
  return Lookup;
};