module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define("profile", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // 'users' refers to table name
                key: 'id', // 'id' refers to column name in users table
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mobile: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'Users', // 'users' refers to table name
                key: 'mobile', // 'id' refers to column name in users table
            }
        },
        alternatePhoneNumber: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [10, 15],
                    msg: "Mobile number length should be between 10 and 15 characters"
                }
            }
        },
        dateOfBirth: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
                isDate: true,
                isBefore: {
                    args: new Date().toString(),
                    msg: "Date of birth cannot be in the future"
                }
            }
        },
        spouseName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        spousePhoneNumber: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [10, 15],
                    msg: "Mobile number length should be between 10 and 15 characters"
                },
                is: {
                    args: /^[0-9]+$/i,
                    msg: "Mobile number should only contain digits"
                }
            }
        },
        mothersName:{
            type: Sequelize.STRING,
            allowNull: true
        },
        fathersName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        numberOfBrothers: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        numberOfSisters: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        siblingNames: {
            type: Sequelize.STRING,
            allowNull: true,
            get() {
                const value = this.getDataValue('siblingNames');
                return value ? value.split(',') : null; // or return an empty array []        
            },
            set(val) {
                this.setDataValue('siblingNames', val ? val.join(',') : null);
            }
        },
        country: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        state: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        district: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        pincode: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                is: {
                    args: /^[0-9]+$/i,
                    msg: "Pincode should only contain digits"
                },
                len: {
                    args: [5, 6],
                    msg: "Pincode length should be between 5 and 6 characters"
                }
            }        
        },
        nativeState: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        nativeDistrict: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        nativeCity: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        sect: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isIn: {
                    args: [['Digambar', 'Shwetambar - Murtipujak', 'Sthanakwasi', 'Terapanthi(Swetambar)']],
                    msg: "Sect should be one of Digambar, Shwetambar - Murtipujak, Sthanakwasi, Terapanthi(Swetambar)"
                }
            }
        },
        subCaste: {
            type: Sequelize.STRING,
            allowNull: true
        },
        facebook: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        instagram: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        linkedin: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    return Profile;
};