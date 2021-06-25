export default (sequelize, DataTypes) => {
  const Audio = sequelize.define('Audio', {
    filename: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
      }
    },
    audioKanji: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
      }
    },
	audioKana: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
      }
    },
    audioEnglish: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
      }
    }
  }, {});
  Audio.associate = (models) => {
    // associations can be defined here
	
  };
  return Audio;
};