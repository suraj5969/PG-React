SELECT  [id]
      ,[proposal_no]
      ,[miscellaneous]
      ,[included]
      ,[hours]
      ,[price]
    FROM [dbo].[miscellaneous]
    WHERE [proposal_no] =  @proposal_no