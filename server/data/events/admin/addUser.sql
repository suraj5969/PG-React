/**** Add the New User ****/

INSERT INTO [dbo].[users]
        ([email]
        ,[password]
        ,[fname]
        ,[lname]
        ,[phone]
        ,[city]
        ,[postal_code]
        ,[country]
        ,[gender]
        ,[solution_specialist]
        ,[address]
        ,[can_view]
        ,[can_create]
        ,[edit_other]
        ,[gets_notified]
        ,[date_added]
        ,[date_updated]
        ,[can_approve]
        ,[is_active]       
        ,[role_id]
        )

VALUES
    (   
        @email,
        @password,
        @fname,
        @lname,
        @phone,
        @city,
        @postal_code,
        @country,
        @gender,
        @solution_specialist,
        @address,
        @can_view,
        @can_create,
        @edit_other,
        @gets_notified,
        @date_added,
        @date_updated,
        @can_approve,
        @is_active,
        @role_id
    )