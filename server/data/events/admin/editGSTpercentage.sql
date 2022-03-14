
UPDATE [dbo].[admin_gst_percentage]
    SET [country_name] = @country_name
        ,[gst_percentage] = @gst_percentage
WHERE [id]=@id