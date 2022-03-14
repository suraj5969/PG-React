/***** SQL query for changing approval status in client_profile *****/
UPDATE [dbo].[proposal_details]
    SET [status_id] = @approval_status,
        [ops_approved_date] = @ops_approved_date,
        [ops_approver_id] = @ops_approver_id
    WHERE [proposal_no] = @proposal_no
