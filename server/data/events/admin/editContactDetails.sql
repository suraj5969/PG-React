
UPDATE [dbo].[admin_contact_details]
    SET [country_name] = @country_name
        ,[phone_no] = @phone_no
        ,[email] = @email
    WHERE [id]=@id