SELECT [id]
      ,[proposal_no]
      ,[upcost_name]
      ,[cost]
      ,[percent_discount]
      ,[discount_item_cost]
      ,[discount_amount]
    FROM [dbo].[upfront_cost]
    WHERE [proposal_no]=@proposal_no