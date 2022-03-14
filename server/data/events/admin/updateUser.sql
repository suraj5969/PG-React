/****query to update user info****/
UPDATE [dbo].[users]
    SET [email] = @email
        ,[fname] = @fname
        ,[lname] = @lname
        ,[gender] = @gender
        ,[address] = @address
        ,[city] = @city
        ,[country] = @country
        ,[postal_code] = @postal_code
        ,[solution_specialist] = @solution_specialist
        ,[phone] = @phone
        ,[role_id] = @role_id
        ,[can_view] = @can_view
        ,[can_create] = @can_create
        ,[edit_other] = @edit_other
        ,[can_approve] = @can_approve
        ,[gets_notified] = @gets_notified
        ,[date_updated] = @date_updated
WHERE [user_id] = @user_id