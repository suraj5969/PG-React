
UPDATE [dbo].[proposal_details]
    SET [edited_by] = @edited_by
        ,[edited_date] = @edited_date
        ,[edited_reason] = @edited_reason
    WHERE [proposal_no] = @proposal_no
