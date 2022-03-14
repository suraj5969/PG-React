SELECT A.[proposal_no]
      ,A.[created_by]
      ,A.[status_id]
      ,A.[next_approver_id]
      ,A.[lifecycle_id]
      ,A.[lock_proposal]
      ,B.[client_name]
      ,B.[client_number]
      ,B.[opp_number]
      ,B.[num_of_users]
      ,B.[solution_specialist_id]
      ,[C].[fname]  + ' ' + C.[lname] AS sln_specialist_name
    FROM [dbo].[proposal_details] AS A,
        [dbo].[client_profile] AS B,
        [dbo].[users] AS C
    WHERE B.[proposal_no] = A.[proposal_no] AND
          C.[user_id] = B.[solution_specialist_id] AND
          B.[country] = @country
    ORDER BY A.[proposal_no] DESC