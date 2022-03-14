SELECT [proposal_no]
      ,[course_name]
      ,[nof_people]
  FROM [dbo].[attending_courses]
  WHERE [proposal_no] = @proposal_no