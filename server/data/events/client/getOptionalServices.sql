/****** Script for SelectTopNRows command from SSMS  ******/
SELECT  [proposal_no]
        ,[task]
        ,[team]
        ,[include]
        ,[traning_method]
        ,[pm]
        ,[tsg]
        ,[data_migration]
        ,[accounts_training]
        ,[accounts_consulting]
        ,[bpa_training]
        ,[bpa_consulting]
        ,[travel]
        ,[total_hrs]
    FROM [dbo].[optional_services]
    WHERE [proposal_no] = @proposal_no