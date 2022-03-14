/***** SQL query for changing approval status in client_profile *****/
UPDATE [dbo].[proposal_details]
    SET [status_id] = @approval_status,
        [s_manager_approved_date] = @s_manager_approved_date,
        [s_manager_id] = @s_manager_id
    WHERE [proposal_no] = @proposal_no