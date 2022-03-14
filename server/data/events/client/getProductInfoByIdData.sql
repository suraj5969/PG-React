SELECT [prdct_name]
      ,[PRDCT_ID]
      ,[STD_UNIT_PRICE_AMT]
      ,[BU_NAME]
  FROM [ProposalGenerator].[dbo].[GDW_WC_PRDCT_PRICE_LIST_D]
  WHERE [PRDCT_ID] = @product_id