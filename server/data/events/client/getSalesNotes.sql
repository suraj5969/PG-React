SELECT [proposal_no]
      ,[date]
      ,[note]
      ,[time]
      ,[user_name]
      ,[user_id]
      ,[note_no]
  FROM [dbo].[sales_notes]
  WHERE [proposal_no] = @proposal_no