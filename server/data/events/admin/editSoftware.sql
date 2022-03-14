
UPDATE [dbo].[soft_client_on]
    SET [soft_name] = @soft_name
        ,[version] = @version
WHERE [id]=@id
