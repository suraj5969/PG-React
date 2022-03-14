SELECT [user_id]
        ,[email]
        ,[fname]
        ,[lname]
        ,[gender]
        ,[address]
        ,[city]
        ,[country]
        ,[postal_code]
        ,[role_id]
        ,[date_added]
        ,[is_active]
        ,[solution_specialist]
        ,[phone]
        ,[fax]
        ,[can_view]
        ,[can_create]
        ,[edit_other]
        ,[can_approve]
        ,[gets_notified]
        ,[date_updated]
FROM [dbo].[users]
WHERE [email]=@email





