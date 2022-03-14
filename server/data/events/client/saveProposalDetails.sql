
INSERT INTO [dbo].[proposal_details]
    (
       [proposal_no]
      ,[created_by]
      ,[date_of_submission]
      ,[submitted_for_workflow]
      ,[status_id]
      ,[lifecycle_id]  
    )

    VALUES
    (
        @proposal_no,
        @created_by,
        @date_of_submission,
        @submitted_for_workflow,
        @status_id,
        @lifecycle_id
    )