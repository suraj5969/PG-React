SELECT [user_id]
       ,[fname]
       ,[lname]
    FROM [dbo].[users]
    WHERE [user_id] IN (
        SELECT [solution_specialist_id]
        FROM [dbo].[client_profile]
        WHERE [country] = @country
        GROUP BY [solution_specialist_id]
    )