
INSERT INTO [dbo].[attending_courses]
        (
        [proposal_no]
      ,[course_name]
      ,[nof_people]
        )

VALUES
    (   
        @proposal_no
      ,@operations_label
      ,@operations_users
    ),
    (   
        @proposal_no
      ,@dataforms_label
      ,@dataforms_users
    ),
    (   
        @proposal_no
      ,@account_label
      ,@account_users
    ),
    (   
        @proposal_no
      ,@bpa_label
      ,@bpa_users
    )