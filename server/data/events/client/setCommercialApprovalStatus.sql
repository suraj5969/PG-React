/***** SQL query for changing approval status in client_profile *****/
UPDATE [dbo].[proposal_details]
    SET [status_id] = @approval_status,
        [comm_approved_date] = @comm_approved_date,
        [comm_approver_id] = @comm_approver_id
    WHERE [proposal_no] = @proposal_no
