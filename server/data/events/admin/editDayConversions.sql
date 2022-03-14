
UPDATE [dbo].[Day_Conversion]
    SET [DAY_NAME] = @DAY_NAME
        ,[NO_OF_DAYS] = @NO_OF_DAYS
WHERE [DAY_ID]=@id