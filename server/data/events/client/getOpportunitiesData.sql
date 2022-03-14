SELECT DISTINCT [opty_id], [opty_name]
  FROM [ProposalGenerator].[dbo].[GDW_ACCT_ADDRESS_D]
  WHERE [acct_id] = @clientNumber