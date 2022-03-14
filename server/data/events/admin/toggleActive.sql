/****query to activate/inactivate user****/
UPDATE [dbo].[users]
    SET [is_active] = @is_active
WHERE [user_id] = @id