// import React,{ useState } from "react";
// import Header from "./Header";
// import Table from "./Table";




// const data = [
//     {
//       proposalNumber: "LNPROP576",
//       clientName: "CNM Legal Pty Ltd",
//       clientNumber: "422QKRB45",
//       opportunityNumber: "1-5AZPQS5",
//       numberOfUsers: 6,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP573",
//       clientName: "Ian Upjohn",
//       clientNumber: "422MJX3H6",
//       opportunityNumber: "1-325UNGT",
//       numberOfUsers: 45,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP572",
//       clientName: "JHK Legal",
//       clientNumber: "42523HCS3",
//       opportunityNumber: "1-5EFADM6",
//       numberOfUsers: 52,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP570",
//       clientName: "R4.0 Test Internal Account",
//       clientNumber: "1000UETUH",
//       opportunityNumber: "1-ZVP8IY",
//       numberOfUsers: 10,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Tejesh Walmiki",
//     },
//     {
//       proposalNumber: "LNPROP569",
//       clientName: "Ian Upjohn",
//       clientNumber: "422MJX3H6",
//       opportunityNumber: "1-325UNGT",
//       numberOfUsers: 12,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP568",
//       clientName: "Ian Upjohn",
//       clientNumber: "422MJX3H6",
//       opportunityNumber: "1-325UNGT",
//       numberOfUsers: 45,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP566",
//       clientName: "John McKenzie",
//       clientNumber: "424Y6HLDT",
//       opportunityNumber: "1-325WGFG",
//       numberOfUsers: 42,
//       approvalStatus: "Pending for Ops Team Approval",
//       nextApprover: "	Bejay Molino",
//       solutionSpecialist: "Ravindra Varpe",
//     },
//     {
//       proposalNumber: "LNPROP563",
//       clientName: "Fazzini Lawyers & Consultants",
//       clientNumber: "425424KVS",
//       opportunityNumber: "1-5D8J65",
//       numberOfUsers: 8,
//       approvalStatus: "Rejected",
//       nextApprover: "",
//       solutionSpecialist: "Malcolm Mcnamara",
//     },
//     {
//       proposalNumber: "LNPROP576",
//       clientName: "CNM Legal Pty Ltd",
//       clientNumber: "422QKRB45",
//       opportunityNumber: "1-5AZPQS5",
//       numberOfUsers: 6,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP573",
//       clientName: "Ian Upjohn",
//       clientNumber: "422MJX3H6",
//       opportunityNumber: "1-325UNGT",
//       numberOfUsers: 45,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP572",
//       clientName: "JHK Legal",
//       clientNumber: "42523HCS3",
//       opportunityNumber: "1-5EFADM6",
//       numberOfUsers: 52,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP570",
//       clientName: "R4.0 Test Internal Account",
//       clientNumber: "1000UETUH",
//       opportunityNumber: "1-ZVP8IY",
//       numberOfUsers: 10,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Tejesh Walmiki",
//     },
//     {
//       proposalNumber: "LNPROP569",
//       clientName: "Ian Upjohn",
//       clientNumber: "422MJX3H6",
//       opportunityNumber: "1-325UNGT",
//       numberOfUsers: 12,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP568",
//       clientName: "Ian Upjohn",
//       clientNumber: "422MJX3H6",
//       opportunityNumber: "1-325UNGT",
//       numberOfUsers: 45,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP566",
//       clientName: "John McKenzie",
//       clientNumber: "424Y6HLDT",
//       opportunityNumber: "1-325WGFG",
//       numberOfUsers: 42,
//       approvalStatus: "Pending for Ops Team Approval",
//       nextApprover: "	Bejay Molino",
//       solutionSpecialist: "Ravindra Varpe",
//     },
//     {
//       proposalNumber: "LNPROP563",
//       clientName: "Fazzini Lawyers & Consultants",
//       clientNumber: "425424KVS",
//       opportunityNumber: "1-5D8J65",
//       numberOfUsers: 8,
//       approvalStatus: "Rejected",
//       nextApprover: "",
//       solutionSpecialist: "Malcolm Mcnamara",
//     },
  
//     {
//       proposalNumber: "LNPROP576",
//       clientName: "CNM Legal Pty Ltd",
//       clientNumber: "422QKRB45",
//       opportunityNumber: "1-5AZPQS5",
//       numberOfUsers: 6,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP573",
//       clientName: "Ian Upjohn",
//       clientNumber: "422MJX3H6",
//       opportunityNumber: "1-325UNGT",
//       numberOfUsers: 45,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP572",
//       clientName: "JHK Legal",
//       clientNumber: "42523HCS3",
//       opportunityNumber: "1-5EFADM6",
//       numberOfUsers: 52,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP570",
//       clientName: "R4.0 Test Internal Account",
//       clientNumber: "1000UETUH",
//       opportunityNumber: "1-ZVP8IY",
//       numberOfUsers: 10,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Tejesh Walmiki",
//     },
//     {
//       proposalNumber: "LNPROP569",
//       clientName: "Ian Upjohn",
//       clientNumber: "422MJX3H6",
//       opportunityNumber: "1-325UNGT",
//       numberOfUsers: 12,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP568",
//       clientName: "Ian Upjohn",
//       clientNumber: "422MJX3H6",
//       opportunityNumber: "1-325UNGT",
//       numberOfUsers: 45,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP566",
//       clientName: "John McKenzie",
//       clientNumber: "424Y6HLDT",
//       opportunityNumber: "1-325WGFG",
//       numberOfUsers: 42,
//       approvalStatus: "Pending for Ops Team Approval",
//       nextApprover: "	Bejay Molino",
//       solutionSpecialist: "Ravindra Varpe",
//     },
//     {
//       proposalNumber: "LNPROP563",
//       clientName: "Fazzini Lawyers & Consultants",
//       clientNumber: "425424KVS",
//       opportunityNumber: "1-5D8J65",
//       numberOfUsers: 8,
//       approvalStatus: "Rejected",
//       nextApprover: "",
//       solutionSpecialist: "Malcolm Mcnamara",
//     },
//     {
//       proposalNumber: "LNPROP576",
//       clientName: "CNM Legal Pty Ltd",
//       clientNumber: "422QKRB45",
//       opportunityNumber: "1-5AZPQS5",
//       numberOfUsers: 6,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP573",
//       clientName: "Ian Upjohn",
//       clientNumber: "422MJX3H6",
//       opportunityNumber: "1-325UNGT",
//       numberOfUsers: 45,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP572",
//       clientName: "JHK Legal",
//       clientNumber: "42523HCS3",
//       opportunityNumber: "1-5EFADM6",
//       numberOfUsers: 52,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP570",
//       clientName: "R4.0 Test Internal Account",
//       clientNumber: "1000UETUH",
//       opportunityNumber: "1-ZVP8IY",
//       numberOfUsers: 10,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Tejesh Walmiki",
//     },
//     {
//       proposalNumber: "LNPROP569",
//       clientName: "Ian Upjohn",
//       clientNumber: "422MJX3H6",
//       opportunityNumber: "1-325UNGT",
//       numberOfUsers: 12,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP568",
//       clientName: "Ian Upjohn",
//       clientNumber: "422MJX3H6",
//       opportunityNumber: "1-325UNGT",
//       numberOfUsers: 45,
//       approvalStatus: "Approved",
//       nextApprover: "",
//       solutionSpecialist: "Rahul Nagare",
//     },
//     {
//       proposalNumber: "LNPROP566",
//       clientName: "John McKenzie",
//       clientNumber: "424Y6HLDT",
//       opportunityNumber: "1-325WGFG",
//       numberOfUsers: 42,
//       approvalStatus: "Pending for Ops Team Approval",
//       nextApprover: "	Bejay Molino",
//       solutionSpecialist: "Ravindra Varpe",
//     },
//     {
//       proposalNumber: "LNPROP563",
//       clientName: "Fazzini Lawyers & Consultants",
//       clientNumber: "425424KVS",
//       opportunityNumber: "1-5D8J65",
//       numberOfUsers: 8,
//       approvalStatus: "Rejected",
//       nextApprover: "",
//       solutionSpecialist: "Malcolm Mcnamara",
//     },
  
//   ];
  

// export default function Dashboard() {

//     const [tableData, setTableData] = React.useState(data);

//     const [filterOptions, setFilterOptions] = React.useState(
//       {
//         approvalStatus: 'All',
//         nextApprover: 'All',
//         solutionSpecialist: 'All',
//         lifecycle: 'All'
//       });

//       React.useEffect(() => {
//         //   let count = 0;
    
//         // count = filterOptions.approvalStatus === 'All'? count : ++count;
//         // count = filterOptions.nextApprover === 'All'? count : ++count;
//         // count = filterOptions.solutionSpecialist === 'All'? count : ++count;
//         // count = filterOptions.lifecycle === 'All'? count : ++count;
    
//         // let tempData = tableData;
//         // if (count <= 1) {
//         //   tempData = data;
//         // }
        
//         console.log('useeffect in dashboard called');
//         let FilteredData = data.filter(row => {
    
//           if ((filterOptions.approvalStatus !== 'All') && (filterOptions.approvalStatus.trim().toLowerCase() !== row.approvalStatus.trim().toLowerCase())) {
//             return false;
//           }
    
//           if ((filterOptions.nextApprover !== 'All') && (filterOptions.nextApprover.trim().toLowerCase() !== row.nextApprover.trim().toLowerCase())) {
//             return false;
//           }
//           if ((filterOptions.solutionSpecialist !== 'All') && (filterOptions.solutionSpecialist.trim().toLowerCase() !== row.solutionSpecialist.trim().toLowerCase())) {
//             return false;
//           }
    
//         //   if ((filterOptions.lifecycle !== 'All') && (filterOptions.lifecycle.trim().toLowerCase() !== row.lifecycle.trim().toLowerCase())) {
//         //     return false;
//         //   }
    
//           return true;
//         })
    
    
//         // if (count === 0) {
//         //   setTableData(data);
//         // }
//         // else {
//         // }
//         setTableData(FilteredData);
    
//       }, [filterOptions])
    


//     return (
//         <>
//         <Header setFilterOptions={setFilterOptions} />
//         <Table tableData={tableData} />
//         </>
//     )

// }