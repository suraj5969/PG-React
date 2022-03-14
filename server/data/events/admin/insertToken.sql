/****query to update token info****/
UPDATE [dbo].[users]
    SET [forgot_pass] = @token,
    [forgot_pass_expiry] = DATEADD(minute,60,GETDATE())
WHERE [email] = @email