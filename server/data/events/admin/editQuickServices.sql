UPDATE [dbo].[quick_start_services]
    SET [service_name] = @service_name
        ,[nofhrs] = @nofhrs
WHERE [service_id] = @id