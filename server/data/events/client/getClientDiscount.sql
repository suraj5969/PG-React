/***** SQL query to get discount for a proposal *****/

SELECT [percent_discount]
FROM [dbo].[upfront_cost]
where [proposal_no] = @proposal_no AND [upcost_name] = 'Sub Total'