SELECT  [proposal_no]
      ,[client_name]
      ,[client_number]
      ,[opp_number]
      ,[opp_name]
      ,[num_of_users]
      ,[num_of_earners]
      ,[objective]
      ,[commercial_objective]
      ,[upsell]
      ,[address]
      ,[country]
      ,[solution_specialist_id]
      ,[duration]
      ,[end_valid_date]
      ,[quick_start]
      ,[current_software_id]
      ,[hours_from_capital]
      ,[time_inc_in_project]
      ,[traning_method]
      ,[bpa_setup]
      ,[special_conditions]
      ,[currency]
   FROM [dbo].[client_profile]
   WHERE [proposal_no]  = @proposal_no