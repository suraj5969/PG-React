/***** SQL query to get discount for a proposal *****/

SELECT [discount_percent]
FROM [dbo].[repayment_discount]
where [proposal_no] = @proposal_no AND [label] LIKE 'Total _ Year Contract Value'