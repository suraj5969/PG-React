
UPDATE [dbo].[Hrs_per_day]
    SET [location] = @location
        ,[hrs_per_days] = @hrs_per_days
WHERE [loc_id]=@id