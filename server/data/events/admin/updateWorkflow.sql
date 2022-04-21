UPDATE [dbo].[workflow_approval]
   SET [aus_user_id] = @aus_user_id
 WHERE [id] = @row_id