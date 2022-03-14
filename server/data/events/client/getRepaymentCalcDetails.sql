SELECT [id]
      ,[proposal_no]
      ,[repayments]
      ,[payment]
      ,[lexis_care]
    FROM [dbo].[repayment_calculator]
    WHERE [proposal_no]=@proposal_no