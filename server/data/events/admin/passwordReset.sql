

UPDATE [dbo].[users]
    SET [password]=@newPass
WHERE [user_id] = @user_id