import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment-timezone';
import { AgGridReact, SortableHeaderComponent} from 'ag-grid-react';
import { AllModules } from "ag-grid-enterprise";
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../../assets/scss/promotion-landing.scss';
import '../../../assets/scss/modal.scss';
import EditButtonRenderer from './editButton.js';
import { getStoreOffers } from '../../../redux/actions/index';
import SpinnerComponent from '../../shared/spinner/SpinnerComponent';

export class PromotionLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySpinner: false,
      modules: AllModules,
      columnDefs: [{
        headerName: "Participate", field: "participate", valueFormatter: this.displayTrueorFalse, minWidth: 130, flex: 1, suppressMenu : true, lockPosition : true, unSortIcon: true
      }, {
        headerName: "Change Reason", field: "change_reason", minWidth: 175, flex: 3, suppressMenu : true, lockPosition : true, unSortIcon: true
      }, {
        headerName: "Promotion Name", field: "offer_name", minWidth: 245, flex: 3, suppressMenu : true, lockPosition : true, unSortIcon: true
      }, {
        headerName: "Effective Date", field: "change_effective_date", valueFormatter: this.dateFormatter, minWidth: 150, flex: 1, suppressMenu : true, lockPosition : true, unSortIcon: true
      }, {
        headerName: "Promotion End Date", field: "end_date", valueFormatter: this.dateFormatter, minWidth: 160, flex: 1, suppressMenu : true, lockPosition : true, unSortIcon: true
      }, {
        headerName: "", field: "", cellRenderer: "EditButtonRenderer", minWidth: 140, flex: 1, suppressMenu : true, lockPosition : true
      }],
      rowData:[],
      context: { componentParent: this },
      frameworkComponents: {
        EditButtonRenderer: EditButtonRenderer
      },
      
      // getRowClass: (params) => {
      //   if (moment(params.data.change_effective_date).format('MM/DD/YYYY') < moment().format('MM/DD/YYYY')) {
      //     return "bold";
      //   }
      // }

      // getRowClass:  {
      //   "bold": function (params) {
      //   let effectiveDate = moment(params.data.change_effective_date).format('MM/DD/YYYY');
      //   let systemDate = moment().format('MM/DD/YYYY');
      //   return effectiveDate > systemDate
      //   }
      // }

      // getRowClass : function(params) {
      //   if (params.data.bold_row  === true) {
      //       return 'bold';
      //   }
      // }
    };
  }

  componentDidMount() {
    const { storeOffers } = this.props;
    this.setState({
      rowData: storeOffers,
      displaySpinner: true
    })
    this.props.dispatch(getStoreOffers());
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      rowData: newProps.storeOffers,
      displaySpinner:false
    })
  }

  displayTrueorFalse(params) {
    return params.value === true ? 'Y' : 'N'
  }

  dateFormatter(params) {
    return moment(params.value).format('MM/DD/YYYY');
  }

  onGridReady = params => {
    this.api = params.api;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
      });
    });
    params.api.sizeColumnsToFit();
  };

  render() {
    const {displaySpinner} = this.state;
    return (
      <div className="ag-grid ag-theme-material" style={{ width: "100%", height: "100%" }}>
      <AgGridReact
      defaultColDef = {
        {
          sortable: true,
          filter: true,
          headerComponentFramework: SortableHeaderComponent,
          headerComponentParams: {
            menuIcon: 'fa-bars'
          }
        }
      }
        columnDefs={this.state.columnDefs}
        rowData={this.state.rowData}
        modules={this.state.modules}
        context={this.state.context}
        rowSelection={this.state.rowSelection}
        frameworkComponents={this.state.frameworkComponents}
        onGridReady={this.onGridReady}
        //getRowClass={this.state.getRowClass}
        >
      </AgGridReact>
      {displaySpinner &&
        <SpinnerComponent displaySpinner={displaySpinner} />
      }
      <footer className="footer">
            <div className="container">
              <button className="btn btn-outline-secondary mr-3" onClick={this.onClickClose}>Close</button>
            </div>
        </footer>
    </div>);
  }
}

const mapStateToProps = state => {
  return ({
   storeOffers: state.storeOffers.getStoreOffers && state.storeOffers.getStoreOffers.payload ? state.storeOffers.getStoreOffers.payload : {}
  });
}

export default connect(
  mapStateToProps
)(withRouter(PromotionLanding))