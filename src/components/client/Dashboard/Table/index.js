import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import Header from "../Header";
import getDashboardDataAPI from "../../../../apis/client/getDashboardDataAPI";
import archiveProposalAPI from "../../../../apis/client/archiveProposalAPI";
import editProposalDetailsAPI from "../../../../apis/client/editProposalDetailsAPI";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import getSingleUserDetailsAPI from "../../../../apis/admin/getSingleUserDetailsAPI";
import Loader from '../../../admin/Loader';
import { useHistory } from 'react-router-dom';
import EditProposalPopup from '../../PopUps/EditProposalPopup';
import { encrypt } from '../../encryptURL';

// Import Material Icons
import { forwardRef } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import './Table.css'

var lodashFilter = require('lodash.filter');

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function Table() {

  React.useEffect(() => {
    document.title = 'Dashboard'
  }, []);

  const history = useHistory();

  const [tableData, setTableData] = React.useState([]);
  const [allData, setAllData] = React.useState([]);
  const [isData, setIsData] = React.useState(false);
  // const filterCountry = sessionStorage.getItem('countryFilter');
  // const [countrySelected, setCountrySelected] = React.useState(filterCountry !== null ? filterCountry :'All');
  const [reRender, setReRender] = React.useState(false);
  console.log(sessionStorage.getItem('countryFilter'));
  const [filterOptions, setFilterOptions] = React.useState({
    approvalStatusID: 0,
    nextApproverID: 0,
    solutionSpecialistID: 0,
    lifecycleID: 1,
    countrySelected: 'All',
  });


  React.useEffect(() => {
    if (isData) {
      let count = 0;
      let filters = {};
      if (filterOptions.approvalStatusID !== 0) {
        filters['status_id'] = filterOptions.approvalStatusID;
        count++;
      }
      if (filterOptions.nextApproverID !== 0) {
        filters['next_approver_id'] = filterOptions.nextApproverID;
        count++;
      }
      // console.log(filterOptions.nextApproverID, 'next approver');

      if (filterOptions.solutionSpecialistID !== 0) {
        filters['solution_specialist_id'] = filterOptions.solutionSpecialistID;
        count++;
      }
      if (filterOptions.lifecycleID !== 0) {
        filters['lifecycle_id'] = filterOptions.lifecycleID;
        count++;
      }
      if (filterOptions.countrySelected !== 'All') {
        filters['country'] = filterOptions.countrySelected;
        count++;
      }

      if (count > 0) {
        const FilteredData = lodashFilter(allData, filters);
        setTableData(FilteredData);
      }
      else {
        setTableData(allData);
      }
    }
  }, [filterOptions, isData, allData])


  React.useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const country = sessionStorage.getItem('country');
      const result = await getDashboardDataAPI(country);
      if (result.status !== 200) {
        console.log('getDashboardDataAPI not working')
      }
      else {
        if (result.data instanceof Array) {
          if (isMounted) {
            setTableData(result.data);
            setAllData(result.data);
            setIsData(true);
          }
        }
      }
    }
    fetchData();

    return () => {
      isMounted = false;
    }
  }, [])



  // const [numberOfRows, setnumberOfRows] = React.useState(10);
  // const handleRowsEntriesChange = (event) => {
  //   setnumberOfRows(event.target.value);
  // };

  // const tableRef = React.useRef(null);

  // React.useEffect(() => {
  //       tableRef.current.dataManager.changePageSize(numberOfRows);
  //  }, [numberOfRows]);



  const firstTableCellStyle = { borderRight: '1px solid #e5e5e5', borderLeft: '1px solid #e5e5e5' };
  const tableCellStyle = { borderRight: '1px solid #e5e5e5' };
  // const headerStyle = { fontSize: '1rem'}

  let columns = [
    { title: "Proposal Number", field: "proposal_no", cellStyle: firstTableCellStyle, },
    { title: "Client Name", field: "client_name", cellStyle: tableCellStyle, },
    { title: "Client Number", field: "client_number", cellStyle: tableCellStyle, },
    { title: "Opportunity Number", field: "opp_number", cellStyle: tableCellStyle, },
    { title: "Number of Users", field: "num_of_users", type: 'numeric', align: 'left', cellStyle: tableCellStyle, },
    { title: "Approval Status", field: "status", cellStyle: tableCellStyle, },
    { title: "Next Approver", field: "next_approver", cellStyle: tableCellStyle, },
    { title: "Solution Specialist", field: "sln_specialist_name", cellStyle: tableCellStyle, },
  ];


  const [statusType, setStatusType] = React.useState('');
  const [confirmEdit, setConfirmEdit] = React.useState(false);
  const [editProposalNo, setEditProposalNo] = React.useState('');

  const handelEditPopUpClose = async (reason) => {
    setConfirmEdit(false);
    const user_id = sessionStorage.getItem('user_id');
    if (reason !== false) {
      const result = await editProposalDetailsAPI(editProposalNo, Number(user_id), reason);
      // console.log(result, 'edit proposal');
      if (result.status !== 200) {
        console.log('editProposalDetailsAPI not working');
      }
      else {
        history.push(`/client/edit-proposal/${encrypt(editProposalNo)}`);
      }
    }
  }

  const rights = JSON.parse(sessionStorage.getItem('rights')) || {};
  const user_id = Number(sessionStorage.getItem('user_id')) || -1;
  const solution_specialist = String(sessionStorage.getItem('solution_specialist')).trim().toLowerCase();
  const role = Number(sessionStorage.getItem('role'));

  return (
    <>
      {
        isData ?
          <>
            <EditProposalPopup
              open={confirmEdit}
              onClose={handelEditPopUpClose}
              statusType={statusType}
            />

            <Header setFilterOptions={setFilterOptions} />
            <div style={{ width: "100%", maxWidth: '1500px', margin: '0 auto' }}>
              <MaterialTable
                icons={tableIcons}
                components={{
                  Toolbar: props => {
                    // let _props = { ...props, toolbarButtonAlignment: "right" }
                    return (
                      <>
                        {/* <FormControl style={{ position: 'absolute', zIndex: '10', top: '15px' }} sx={{ mx: 2, width: 150 }}>
                          <InputLabel id="country-select">Country Filter</InputLabel>
                          <Select
                            id="country-select"
                            value={countrySelected}
                            label="Country Filter"
                            variant="outlined"
                            onChange={(e) => {sessionStorage.setItem('countryFilter', e.target.value); setCountrySelected(e.target.value)}}
                          >
                            <MenuItem value='All'>All</MenuItem>
                            <MenuItem value="Australia">Australia</MenuItem>
                            <MenuItem value="New Zealand">New Zealand</MenuItem>
                          </Select>
                        </FormControl> */}
                        <MTableToolbar {...props} />
                      </>
                    )
                  }
                }}
                localization={{
                  header: {
                    actions: 'Operations',
                  },
                  body: {
                    emptyDataSourceMessage: 'No records to display',
                    filterRow: {
                      filterTooltip: 'Filter'
                    }
                  }
                }}
                actions={[
                  // {
                  //   icon: () => <Typography variant="h6" sx={{ p: 0 }}>Show</Typography>,
                  //   isFreeAction: true,
                  //   disabled: true
                  // },
                  // {
                  //   icon: () => {
                  //     return <FormControl variant="standard" sx={{ p: 0 }}>
                  //       <Select
                  //         id="country-select"
                  //         value={countrySelected}
                  //         label="Country"
                  //         variant="outlined"
                  //         onChange={(e) => setCountrySelected(e.target.value)}
                  //       >
                  //         <MenuItem value="Australia">Australia</MenuItem>
                  //         <MenuItem value="New Zealand">New Zealand</MenuItem>
                  //       </Select>
                  //     </FormControl>
                  //   },
                  //   // tooltip: 'Filter',
                  //   // disabled:true,
                  //   // onClick: (event, rowData) =>  null,
                  //   isFreeAction: true
                  // },
                  // {
                  //   icon: () => <Typography variant="h6" sx={{ p: 0 }}>entires</Typography>,
                  //   isFreeAction: true,
                  //   disabled: true
                  // },
                  (rowData) => {
                    return {
                      icon: () => <VisibilityIcon />,
                      disabled: Number(rights.can_view) !== 1 && Number(rowData.created_by) !== user_id,
                      tooltip: 'View proposal', //
                      onClick: (event, rowData) => history.push(`/client/view-proposal/${encrypt(rowData.proposal_no)}`)
                    }
                  },
                  (rowData) => {
                    return {
                      icon: () => <EditIcon />,
                      disabled: Number(rowData.lock_proposal) === 1 || Number(rowData.lifecycle_id) === 2 || (Number(rights.edit_other) !== 1 && Number(rowData.created_by) !== user_id),
                      tooltip: Number(rowData.lock_proposal) === 1 || Number(rowData.lifecycle_id) === 2 || (Number(rights.edit_other) !== 1 && Number(rowData.created_by) !== user_id) ? 'Cannot Edit this Proposal' : 'Edit Proposal',
                      onClick: (event, row) => {
                        if (Number(row.status_id) === 8) {
                          setStatusType('Approved');
                          setEditProposalNo(row.proposal_no);
                          setConfirmEdit(true);
                        }
                        else if (Number(row.status_id) === 1 || Number(row.status_id) === 2 || Number(row.status_id) === 3) {
                          history.push(`/client/edit-proposal/${encrypt(row.proposal_no)}`);
                        }
                        else {
                          setStatusType('Approval Cycle');
                          setEditProposalNo(row.proposal_no);
                          setConfirmEdit(true);
                        }
                      }
                    }
                  },
                  (rowData) => {
                    return {
                      icon: () => <ArchiveOutlinedIcon />,
                      disabled: rowData.lifecycle_id === 2 || solution_specialist !== 'yes' || role !== 1,
                      tooltip: rowData.lifecycle_id === 2 || solution_specialist !== 'yes' || role !== 1 ? 'Cannot Archive this Proposal' : 'Archive Proposal',
                      onClick: async (event, row) => {
                        const archive = await archiveProposalAPI(row.proposal_no);
                        if (archive.status !== 200) {
                          console.log('archiveProposalAPI not working');
                        }
                        else {
                          row.lifecycle_id = 2;
                          setReRender(true); // just to render the table and disable archive button
                          setReRender(false);
                        }
                      }
                    }
                  }
                ]}

                columns={columns}
                data={tableData}
                options={{
                  exportButton: true,
                  exportAllData: true,
                  exportFileName: "Proposals",

                  headerStyle: {
                    // position: 'sticky',
                    // top : '0',
                    backgroundColor: '#008080',
                    color: '#FFF',
                    fontSize: '1.1rem',
                    borderRight: '1px solid #e5e5e5'
                  },
                  // maxBodyHeight: '95vh',
                  draggable: false,
                  disableHorizontalScroll: true,
                  // paging:true,
                  showTitle: false,
                  sorting: false,
                  pageSize: 10,       // make initial page size
                  emptyRowsWhenPaging: false,   // To avoid of having empty rows
                  pageSizeOptions: [10, 25, 50],    // rows selection options
                }}
              />
            </div>
          </>
          : <Loader />
      }
    </>
  );
}