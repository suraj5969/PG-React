/***** SQL query to get the status of a proposal *****/

SELECT [status_id]
  FROM [dbo].[proposal_details]
  WHERE [proposal_no] = @proposal_no
