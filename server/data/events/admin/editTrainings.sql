
UPDATE [dbo].[training_methodology]
    SET [training_name] = @training_name
        ,[dateModified] = @dateModified
        ,[HOURS] = @HOURS
WHERE [id]=@id


