SELECT [software_discount]
      ,[service_discount]
  FROM [dbo].[upfront_discounts]
  WHERE [proposal_no] = @proposal_no