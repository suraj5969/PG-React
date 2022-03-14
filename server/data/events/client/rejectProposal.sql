UPDATE [dbo].[proposal_details]
    SET [status_id] = @approval_status
        ,[rejected_by] = @rejected_by
        ,[rejected_date] = @rejected_date
        ,[rejected_reason] = @rejected_reason
    WHERE [proposal_no] = @proposal_no
