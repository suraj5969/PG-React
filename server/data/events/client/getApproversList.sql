/****** Script for Select approvers names command from SSMS  ******/

SELECT [s_manager_id]
    ,[comm_approver_id]
    ,[cfo_approver_id]
    ,[ops_approver_id]
    ,[next_approver_id]
FROM [dbo].[proposal_details]
WHERE [proposal_no] = @proposal_no