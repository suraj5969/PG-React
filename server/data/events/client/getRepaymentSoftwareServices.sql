SELECT [proposal_no]
      ,[label]
      ,[cost]
      ,[gcrm_entries]
    FROM [dbo].[repayment_software_services]
    WHERE [proposal_no] = @proposal_no