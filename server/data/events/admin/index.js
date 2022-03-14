'use strict';

const utils = require('../../utils');
const config = require('../../../config');
const sql = require('mssql');

const getEvents = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const data = await pool.request().query(sqlQueries.getDataEvent);
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getOneUserDeatils = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const oneUser = await pool.request()
            .input('id', sql.Int, id)
            .query(sqlQueries.getOneUser);
        return oneUser.recordset;
    } catch (error) {
        return error.message;
    }
}

const verifyUser = async (email, password) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const verifyUser = await pool.request()
            .input('email', sql.VarChar(50), email)
            .input('password', sql.VarChar(20), password)
            .query(sqlQueries.verifyUser);
        // console.log(verifyUser)
        return verifyUser.recordset;
    } catch (error) {
        console.log(error)
        return error.message;
    }
}

const forgotPassword = async (email) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const forgotPassword = await pool.request()
            .input('email', sql.VarChar(50), email)
            .query(sqlQueries.forgotPassword);
        // console.log(forgotPassword);
        return forgotPassword.recordset;
    } catch (error) {
        return error.message;
    }
}

const insertToken = async (email, token) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const insertToken = await pool.request()
            .input('email', sql.VarChar(50), email)
            .input('token', sql.VarChar(255), token)
            .query(sqlQueries.insertToken);
        // console.log(insertToken);
        return insertToken.rowsAffected;
    }
    catch (error) {
        return error.message;
    }
}

const passwordReset = async (user_id, currentPass, newPass) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');

        const query = `SELECT [password] FROM [dbo].[users] WHERE [user_id] = ${user_id}`;
        const password = await pool.request().query(query);
        // console.log(password, 'password');
        if (currentPass !== password.recordset[0]['password']) {
            return {
                status: 203,
                message: "Current password dosen't match",
            }
        }

        const passwordReset = await pool.request()
            .input('newPass', sql.VarChar(50), newPass)
            .input('user_id', sql.Int, user_id)
            .query(sqlQueries.passwordReset);
        if (passwordReset.rowsAffected.length > 0) {
            return {
                status: 200,
                message: "Password Updated Successfully",
            }
        }
        else {
            return { status: 422, message: 'Something went wrong!' }
        }
    } catch (error) {
        return error.message;
    }
}

const resetPasswordToken = async (token) => {
    try {
        let pool = await sql.connect(config.sql);

            const query = `SELECT [forgot_pass] FROM [dbo].[users]
                                WHERE [forgot_pass] = @token AND 
                                DATEDIFF(MINUTE, [forgot_pass_expiry], GETDATE()) < 60`;
        const passwordToken = await pool.request()
            .input('token', sql.VarChar(255), token)
            .query(query);
        // console.log(passwordToken, 'passwordToken');
        return passwordToken.recordset;

    } catch (error) {
        return error.message;
    }
}

const resetPassword = async (token, newPassword) => {
    try {
        let pool = await sql.connect(config.sql);

        const tokenExpiry = await resetPasswordToken(token);
        if (tokenExpiry instanceof Array && tokenExpiry.length > 0) {
            const query = `UPDATE [dbo].[users] 
                        SET [password] = @password 
                        WHERE [forgot_pass] = @token`;
            const passwordToken = await pool.request()
                .input('password', sql.VarChar(50), newPassword)
                .input('token', sql.VarChar(255), token)
                .query(query);
            // console.log(passwordToken, 'passwordToken');
            return passwordToken.rowsAffected;
        }
        else {
            return 0;
        }

    } catch (error) {
        return error.message;
    }
}

const getAllUsers = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const getAllUsers = await pool.request()
            .query(sqlQueries.getAllUsers);
        return getAllUsers.recordset;
    } catch (error) {
        return error.message;
    }
}

const toggleActive = async (id, is_active) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const toggleActive = await pool.request()
            .input('id', sql.Int, id)
            .input('is_active', sql.VarChar(30), is_active)
            .query(sqlQueries.toggleActive);
        return toggleActive.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateUser = async (user_id, values) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const updateUser = await pool.request()
            .input('user_id', sql.Int, user_id)
            .input('email', sql.VarChar(50), values.email)
            .input('fname', sql.VarChar(20), values.fname)
            .input('lname', sql.VarChar(20), values.lname)
            .input('gender', sql.VarChar(20), values.gender)
            .input('address', sql.VarChar(50), values.address)
            .input('city', sql.VarChar(30), values.city)
            .input('country', sql.VarChar(30), values.country)
            .input('postal_code', sql.VarChar(20), values.postal_code)
            .input('solution_specialist', sql.NChar(20), values.solution_specialist)
            .input('phone', sql.VarChar(20), values.phone)
            .input('role_id', sql.Int, values.role_id)
            .input('can_view', sql.Int, values.can_view)
            .input('can_create', sql.Int, values.can_create)
            .input('edit_other', sql.Int, values.edit_other)
            .input('can_Approve', sql.Int, values.can_approve)
            .input('gets_notified', sql.Int, values.gets_notified)
            .input('date_updated', sql.SmallDateTime, values.date_updated)
            .query(sqlQueries.updateUser);
        return updateUser.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateWorkflow = async (row_id, values) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const response = await pool.request()
            .input('aus_user_id', values.aus_user_id)
            .input('nz_user_id', values.nz_user_id)
            .input('row_id', row_id)
            .query(sqlQueries.updateWorkflow);
        // console.log(response);
        return response.recordset;
    } catch (error) {
        return error.message;
    }
}

const addUser = async (values) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const oneUser = await pool.request()
            .input('email', sql.VarChar(50), values.email)
            .query(sqlQueries.getOneUserWithMail);
        if (oneUser.recordset.length > 0) {
            return { status: 205, data: "This Email Address Already exists in the system. Please Enter some other email id." };
        } else {
            const addUser = await pool.request()
                .input('email', sql.VarChar(50), values.email)
                .input('password', sql.VarChar(20), values.password)
                .input('fname', sql.VarChar(20), values.fname)
                .input('lname', sql.VarChar(20), values.lname)
                .input('phone', sql.VarChar(20), values.phone)
                .input('city', sql.VarChar(30), values.city)
                .input('postal_code', sql.VarChar(20), values.postal_code)
                .input('country', sql.VarChar(30), values.country)
                .input('gender', sql.VarChar(20), values.gender)
                .input('solution_specialist', sql.NChar(20), values.solution_specialist)
                .input('address', sql.VarChar(50), values.address)
                .input('can_view', sql.Int, values.can_view)
                .input('can_create', sql.Int, values.can_create)
                .input('edit_other', sql.Int, values.edit_other)
                .input('gets_notified', sql.Int, values.gets_notified)
                .input('date_added', sql.DateTime, values.date_added)
                .input('date_updated', sql.SmallDateTime, values.date_updated)
                .input('can_Approve', sql.Int, values.can_approve)
                .input('is_active', sql.Int, values.is_active)
                .input('role_id', sql.Int, values.role_id)
                .query(sqlQueries.addUser);
            // console.log(addUser);
            return addUser.recordset;
        }
    } catch (error) {
        return error.message;
    }
}

const deleteUser = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const deleteUser = await pool.request()
            .input('user_id', sql.Int, id)
            .query(sqlQueries.deleteUser);
        return deleteUser.recordset;
    } catch (error) {
        return error.message;
    }
}

const getMigrations = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const getMigrations = await pool.request()
            .query(sqlQueries.getMigrations);
        return getMigrations.recordset;
    } catch (error) {
        return error.message;
    }
}

const editMigrations = async (migration_id, values) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const editMigrations = await pool.request()
            .input('migration_id', sql.Int, Number(migration_id))
            .input('migration_name', sql.VarChar(500), values.migration_name)
            .input('more_than_ten_cost', sql.VarChar(50), values.more_than_ten_cost)
            // .input('country_name', sql.VarChar(50), values.country_name)
            .input('dm_hours', sql.VarChar(50), values.dm_hours)
            .input('account_consult_hrs', sql.VarChar(50), values.account_consult_hrs)
            .input('comments', sql.VarChar(555), values.comments)
            .input('date_updated', sql.SmallDateTime, new Date())
            .query(sqlQueries.editMigrations);
        return editMigrations.recordset;
    } catch (error) {
        return error.message;
    }
}

const getSingleMigrations = async (migration_id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const singleMigration = await pool.request()
            .input('migration_id', sql.Int, Number(migration_id))
            .query(sqlQueries.getSingleMigration);
        return singleMigration.recordset;
    } catch (error) {
        return error.message;
    }
}

const getTrainings = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const getTrainings = await pool.request()
            .query(sqlQueries.getTrainings);
        return getTrainings.recordset;
    } catch (error) {
        return error.message;
    }
}

const editTrainings = async (id, values) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const editTrainings = await pool.request()
            .input('id', sql.BigInt, id)
            .input('training_name', sql.VarChar(100), values.training_name)
            .input('dateModified', sql.SmallDateTime, new Date())
            .input('HOURS', sql.VarChar(255), values.HOURS)
            .query(sqlQueries.editTrainings);
        return editTrainings.recordset;
    } catch (error) {
        return error.message;
    }
}

const getProductList = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const getProductList = await pool.request()
            .query(sqlQueries.getProductList);
        return getProductList.recordset;
    } catch (error) {
        return error.message;
    }
}

const getSoftwares = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const getSoftwares = await pool.request()
            .query(sqlQueries.getSoftwares);
        return getSoftwares.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteSoftware = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const deleteSoftware = await pool.request()
            .input('id', sql.Int, id)
            .query(sqlQueries.deleteSoftware);
        return deleteSoftware.recordset;
    } catch (error) {
        return error.message;
    }
}

const addSoftware = async (values) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const addSoftware = await pool.request()
            .input('soft_name', sql.VarChar(150), values.soft_name)
            .input('version', sql.VarChar(50), values.version)
            .query(sqlQueries.addSoftware);
        return addSoftware.recordset;
    } catch (error) {
        return error.message;
    }
}

const editSoftware = async (id, values) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const editSoftware = await pool.request()
            .input('id', sql.BigInt, id)
            .input('soft_name', sql.VarChar(150), values.soft_name)
            .input('version', sql.VarChar(50), values.version)
            .query(sqlQueries.editSoftware);
        return editSoftware.recordset;
    } catch (error) {
        return error.message;
    }
}

const getWorkflow = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const getWorkflow = await pool.request()
            .query(sqlQueries.getWorkflow);
        return getWorkflow.recordset;
    } catch (error) {
        return error.message;
    }
}

const getQuickServices = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const getTrainings = await pool.request()
            .query(sqlQueries.getQuickServices);
        return getTrainings.recordset;
    } catch (error) {
        return error.message;
    }
}

const editQuickServices = async (id, values) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const editQuickServices = await pool.request()
            .input('id', sql.BigInt, id)
            .input('service_name', sql.VarChar(100), values.service_name)
            .input('nofhrs', sql.VarChar(50), values.nofhrs)
            .query(sqlQueries.editQuickServices);
        return editQuickServices.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteService = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const deleteService = await pool.request()
            .input('id', sql.Int, id)
            .query(sqlQueries.deleteService);
        return deleteService.recordset;
    } catch (error) {
        return error.message;
    }
}

const getContactDetails = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const getContactDetails = await pool.request()
            .query(sqlQueries.getContactDetails);
        return getContactDetails.recordset;
    } catch (error) {
        return error.message;
    }
}

const editContactDetails = async (id, values) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const editContactDetails = await pool.request()
            .input('id', sql.BigInt, id)
            .input('country_name', sql.VarChar(100), values.country_name)
            .input('phone_no', sql.VarChar(50), values.phone_no)
            .input('email', sql.VarChar(100), values.email)
            .query(sqlQueries.editContactDetails);
        return editContactDetails.recordset;
    } catch (error) {
        return error.message;
    }
}

const getGSTpercentage = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const getGSTpercentage = await pool.request()
            .query(sqlQueries.getGSTpercentage);
        return getGSTpercentage.recordset;
    } catch (error) {
        return error.message;
    }
}

const editGSTpercentage = async (id, values) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const editGSTpercentage = await pool.request()
            .input('id', sql.BigInt, id)
            .input('country_name', sql.VarChar(100), values.country_name)
            .input('gst_percentage', sql.Real, values.gst_percentage)
            .query(sqlQueries.editGSTpercentage);
        return editGSTpercentage.recordset;
    } catch (error) {
        return error.message;
    }
}

const getDayConversions = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const getDayConversions = await pool.request()
            .query(sqlQueries.getDayConversions);
        return getDayConversions.recordset;
    } catch (error) {
        return error.message;
    }
}

const editDayConversions = async (id, values) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const editDayConversions = await pool.request()
            .input('id', sql.BigInt, id)
            .input('DAY_NAME', sql.VarChar(255), values.DAY_NAME)
            .input('NO_OF_DAYS', sql.VarChar(255), values.NO_OF_DAYS)
            .query(sqlQueries.editDayConversions);
        return editDayConversions.recordset;
    } catch (error) {
        return error.message;
    }
}

const getHoursPerDay = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const getHoursPerDay = await pool.request()
            .query(sqlQueries.getHoursPerDay);
        return getHoursPerDay.recordset;
    } catch (error) {
        return error.message;
    }
}

const editHoursPerDay = async (id, values) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const editHoursPerDay = await pool.request()
            .input('id', sql.BigInt, id)
            .input('location', sql.VarChar(100), values.location)
            .input('hrs_per_days', sql.VarChar(50), values.hrs_per_days)
            .query(sqlQueries.editHoursPerDay);
        return editHoursPerDay.recordset;
    } catch (error) {
        return error.message;
    }
}

const getOracleWordings = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const getOracleWordings = await pool.request()
            .query(sqlQueries.getOracleWordings);
        return getOracleWordings.recordset;
    } catch (error) {
        return error.message;
    }
}

const editOracleWordings = async (id, values) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const editOracleWordings = await pool.request()
            .input('id', sql.BigInt, id)
            .input('wordings', sql.VarChar(1000), values.wordings)
            .input('value', sql.VarChar(sql.MAX), values.value)
            .query(sqlQueries.editOracleWordings);
        return editOracleWordings.recordset;
    } catch (error) {
        return error.message;
    }
}

const getMiscellanous = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const getMiscellanous = await pool.request()
            .query(sqlQueries.getMiscellanous);
        return getMiscellanous.recordset;
    } catch (error) {
        return error.message;
    }
}

const editMiscellanous = async (id, values) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('admin');
        const editMiscellanous = await pool.request()
            .input('id', sql.BigInt, id)
            .input('name', sql.VarChar(100), values.name)
            .input('value', sql.VarChar(50), values.value)
            .query(sqlQueries.editMiscellanous);
        return editMiscellanous.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getEvents,
    getOneUserDeatils,
    verifyUser,
    forgotPassword,
    insertToken,
    passwordReset,
    getAllUsers,
    toggleActive,
    updateUser,
    addUser,
    getMigrations,
    editMigrations,
    getSingleMigrations,
    getTrainings,
    editTrainings,
    getProductList,
    getSoftwares,
    deleteSoftware,
    addSoftware,
    editSoftware,
    getWorkflow,
    getQuickServices,
    editQuickServices,
    deleteService,
    getContactDetails,
    editContactDetails,
    getGSTpercentage,
    editGSTpercentage,
    getDayConversions,
    editDayConversions,
    getHoursPerDay,
    editHoursPerDay,
    getOracleWordings,
    editOracleWordings,
    getMiscellanous,
    editMiscellanous,
    deleteUser,
    updateWorkflow,
    resetPasswordToken,
    resetPassword,
}