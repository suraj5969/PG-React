/***** SQL query for changing approval status in client_profile *****/
UPDATE [dbo].[proposal_details]
    SET [status_id] = @approval_status,
        [cfo_approved_date] = @cfo_approved_date,
        [cfo_approver_id] = @cfo_approver_id
    WHERE [proposal_no] = @proposal_no
