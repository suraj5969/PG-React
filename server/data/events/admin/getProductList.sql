SELECT  [prdct_name]
    ,[PRICE_LIST_ID]
    ,[PRDCT_ID]
    ,[STD_UNIT_PRICE_AMT]
    ,CONVERT(nvarchar, [EFF_START_DT], 105) AS [EFF_START_DT]
    ,[RN]
    ,[BU_NAME]
FROM [ProposalGenerator].[dbo].[GDW_WC_PRDCT_PRICE_LIST_D]
WHERE [PRDCT_ID] IN ('1532492', '1532493', '1532491', '1532497', '1534224', '1534220', '1534221', '1532498', '1532488', '1532489', '1533060', '1533061', '1532490', '1533059', '1533031', '1532494', '1532485', '1532486', '1532495', '1533487', '1533058', '1532487', '1532496')
ORDER BY [PRDCT_ID]