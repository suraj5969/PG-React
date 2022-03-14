SELECT A.[id]
        ,A.[module_name]
        ,A.[selected]
		,[B].[num_of_users]
    FROM [dbo].[empower_popup_modules] AS A
	, [dbo].[empower_popup_users_value] AS B
    WHERE A.[proposal_no] = @proposal_no AND  B.[proposal_no] = A.[proposal_no]
        AND B.[proposal_no] = @proposal_no