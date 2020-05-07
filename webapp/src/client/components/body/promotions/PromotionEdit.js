import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment';
import { AgGridReact} from 'ag-grid-react';
import { AllModules } from "ag-grid-enterprise";
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import GroupRowInnerRenderer from './groupRowInnerRenderer';
import '../../../assets/scss/promotion-edit.scss';
import ToggleButton from './toggleButton';
import { formatCurrency } from '../../utility/formatCurrency';
import MessageBox from '../../shared/messageBox/MessageBox';
import { updatePromotion, getItemNames } from '../../../redux/actions/index';
import SpinnerComponent from '../../shared/spinner/SpinnerComponent';

export class PromotionEdit extends React.Component {
  constructor(props) {
    super(props);
    const offer_id = this.props.location.state;
    this.state = {
      displaySpinner: false,
      offerDetails: {},
      isDisabled: true,
      isOn: null,
      showModal: false,
      msgBoxBody: '',
      offer_id: offer_id.offer_id,
      modules: AllModules,
      columnDefs: [{
          field: "psa.psaDescription",
          rowGroup: true,
          hide: true
        },
        {
          field: "psa.orderGroupCode",
          hide: true
        },
        {
          field: "itemId",
          headerName: "Item Number",
          minWidth: 200,
          suppressMenu: true,
          lockPosition : true,
        },
        {
          field: "itemName",
          headerName: "Item Description",
          minWidth: 400,
          suppressMenu: true,
          lockPosition : true,
        }
      ],
      rowData: [],
      frameworkComponents: {
        groupRowInnerRenderer: GroupRowInnerRenderer
      },
      groupRowInnerRenderer: "groupRowInnerRenderer",
    };
  }

    componentDidMount() {
      this.setState({
        displaySpinner: true
      })
    }

    componentWillReceiveProps(newProps) {
      this.setState({
        rowData: newProps.getItemNames
      }, () => {
        const { offerDetails } = this.state;

        if (newProps && newProps.storeOffersDetails && offerDetails != newProps.storeOffersDetails && newProps.storeOffersDetails.items_applied) {
          let storeID = newProps.storeId;
          let itemId = newProps.storeOffersDetails.items_applied;
          this.props.dispatch(getItemNames(storeID, itemId));
          this.setState({
            offerDetails: newProps.storeOffersDetails,
            displaySpinner: false
          })
        }
        if (newProps.storeOffersDetails && newProps.storeOffersDetails.editable_fields) {
          this.setState({
            isOn: newProps.storeOffersDetails.editable_fields.participate
          });
        }
      })
    }

  onFirstDataRendered(params) {
    // params.api.sizeColumnsToFit();
    // setTimeout(function () {
    //   params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    // }, 0);
  }
  
 /* Grid Events we're listening to */
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

onClickClose = () => {
  const { showModal } = this.state;
  const msgBoxBody = `You have unsaved changes which will be lost if you navigate away. Would you like to proceed?`;
  this.setState({
    msgBoxBody: msgBoxBody,
    showModal: !showModal
  }); 
  setTimeout(() => {
    document.getElementById("btn-sideNav-stay-on-page").focus();
  }, 1);  
}

onClickSave = () => {
  this.props.dispatch(updatePromotion({
    participate: this.state.isOn
  }));
  this.props.history.push('/home');
}

modalAction = (showModal) => {
  this.setState({
    showModal: showModal
  })
}

redirectToHome = () => {
  this.props.history.push('/home');
}

toggleValue = (isOn) => {
  const { offerDetails } = this.state;
  if (isOn === offerDetails.editable_fields.participate) {
    if (offerDetails.editable_fields && offerDetails.editable_fields.offer_crp_markdown == true ) {
      this.setState({ isOn: isOn, isDisabled: true });
    } else if (offerDetails.editable_fields && offerDetails.editable_fields.offer_crp_markdown == false) {
      this.setState({ isOn: isOn, isDisabled: true });
    } else {
      this.setState({ isOn: isOn, isDisabled: false });
    }
  } else {
    this.setState({  isOn: isOn, isDisabled: false })
  }
}

  render() {
    const {offerDetails, msgBoxBody, showModal, isDisabled, isOn, displaySpinner} = this.state;   
    return (
      <div className="promotion-edit container-body-right">
  
        <div className="row col-container">
          <div className="col-sm-4 col-left">
            <div className="">
              <p>
                <span className="col-header">Change Effective Date: </span>
                <span id="changeDate">{moment(offerDetails.change_effective_date).format('MM/DD/YYYY')}</span>
              </p>
              <p>
                <span className="col-header">Change Reason: </span>
                <span id="changeReason">{offerDetails.change_reason}</span>
              </p>
              <p>
                <span className="col-header">Promotion Name: </span>
                <span id="promotionName" >{offerDetails.offer_name}</span>
              </p>
              <p>
                <span className="col-header">Promotion Description: </span>
                <span id="promotionDescription">{offerDetails.offer_description}</span>
              </p>
              <p>
                <span className="col-header">Promotion Start Date: </span>
                <span id="promotionStart">{moment(offerDetails.start_date).format('MM/DD/YYYY')}</span>
              </p>
              <p>
                <span className="col-header">Promotion End Date: </span>
                <span id="promotionEnd">{moment(offerDetails.end_date).format('MM/DD/YYYY')}</span>
              </p>
              <p>
                <span className="col-header">Promotion SRP Markdown: </span>
                <span id="promotionSRPMarkdown">{formatCurrency(offerDetails.offer_srp_markdown)}</span>
              </p>
              { isOn != null && 
              <p>
                <span className="col-header">Participate:</span>
                <ToggleButton id="participateToggle" isOn={isOn} toggleValue={this.toggleValue} />
              </p>
              }
            </div>
          </div>
          <div className="col-sm-8 col-right">
            <div className="ag-grid ag-theme-material ag-grid-accordion" style={{ width: "100%", height: "100%" }}>
              <AgGridReact
                modules={this.state.modules}
                columnDefs={this.state.columnDefs}
                onGridReady={this.onGridReady}
                groupUseEntireRow={true}
                frameworkComponents={this.state.frameworkComponents}
                groupRowInnerRenderer={this.state.groupRowInnerRenderer}
                //  onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                rowData={this.state.rowData}
              />
            </div> 
          </div>
        </div>
        { showModal &&
            <MessageBox 
              className={"message-box"} 
              initialModalState={false} 
              msgTitle={"Unsaved Changes"}
              msgBody={msgBoxBody}  
              isPageValidation={true}
              modalAction={this.modalAction}  
              redirectToHome={this.redirectToHome}
            />
        }
        { displaySpinner &&
          <SpinnerComponent displaySpinner={displaySpinner} />
        }
        <footer className="footer">
            <div className="container">
              <button className="btn btn-primary" disabled={isDisabled} onClick={this.onClickSave}>Save</button>
              <button className="btn btn-outline-secondary mr-3" onClick={this.onClickClose}>Close</button>
            </div>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    storeOffersDetails: state.storeOffers.getStoreOffersDetails && state.storeOffers.getStoreOffersDetails.payload ? state.storeOffers.getStoreOffersDetails.payload : {},
    getItemNames: state.storeOffers.getItemNames && state.storeOffers.getItemNames.payload ? state.storeOffers.getItemNames.payload : {},
    storeId: state.login.storeId
  });
}

export default connect(
  mapStateToProps
)(withRouter(PromotionEdit))
