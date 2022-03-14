SELECT [id]
      ,[proposal_no]
      ,[lexis_care]
      ,[cost]
      ,[percent_discount]
      ,[discount_item_cost]
      ,[discount_amount]
    FROM [dbo].[ongoing_main_fees]
    WHERE [proposal_no] = @proposal_no