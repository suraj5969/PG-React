/***** SQL query for changing approval status in client_profile *****/
UPDATE [dbo].[proposal_details]
    SET [status_id] = @status
    WHERE [proposal_no] = @proposal_no
