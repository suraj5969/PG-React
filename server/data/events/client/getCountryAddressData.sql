SELECT DISTINCT [bu_name] AS country_name, [addresslineitem] AS address
  FROM [ProposalGenerator].[dbo].[GDW_ACCT_ADDRESS_D]
  where [acct_id] = @clientNumber