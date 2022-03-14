
UPDATE [dbo].[admin_data_migration_options]
    SET [migration_name] = @migration_name
        ,[more_than_ten_cost] = @more_than_ten_cost
        ,[dm_hours] = @dm_hours
        ,[account_consult_hrs] = @account_consult_hrs
        ,[comments] = @comments
        ,[date_updated] = @date_updated
    WHERE [migration_id]=@migration_id