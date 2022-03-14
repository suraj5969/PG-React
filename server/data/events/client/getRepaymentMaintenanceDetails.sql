SELECT [id]
      ,[proposal_no]
      ,[maintenance]
      ,[rrp]
      ,[discounted]
  FROM [dbo].[repayment_maintenance]
  WHERE [proposal_no]=@proposal_no