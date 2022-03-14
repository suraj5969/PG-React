UPDATE [dbo].[proposal_details]
    SET [lock_proposal] = @lock_proposal
    WHERE [proposal_no] = @proposal_no
