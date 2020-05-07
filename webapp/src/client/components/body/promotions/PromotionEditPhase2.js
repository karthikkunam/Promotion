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
import { CRP_REGEX, MAX_NUMBER, MIN_NUMBER, DISALLOWED_KEYS, DISALLOWED_KEY_CODES, ALLOWED_KEY_CODES, VALID_KEYS } from '../../utility/constants';


export class PromotionEdit extends React.Component {
  constructor(props) {
    super(props);
    const offer_id = this.props.location.state;
    this.state = {
      displaySpinner: false,
      offerDetails: {},
      isDisabled: true,
      isOn: null,
      crpValue: '',
      showModal: false,
      showCrpModal: false,
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
          minWidth: 650,
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
          let storeID = "37126";
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
          if (newProps.storeOffersDetails && newProps.storeOffersDetails.editable_fields && newProps.storeOffersDetails.editable_fields.offer_crp_markdown == true) {
            this.setState({
              crpValue: `${newProps.storeOffersDetails.offer_crp_markdown}`
            })
          }
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

displayMessageBox = () => {
  const { showCrpModal } = this.state;
  const msgBoxBody = `Promotion CRP must have a value greater than zero or less than 10,000.`
  this.setState({
    msgBoxBody: msgBoxBody,
    showCrpModal: !showCrpModal
  });
  setTimeout(() => {
    document.getElementById("btn-sideNav-ok").focus();
  }, 1);
}

crpModalAction = (showCrpModal) => {
  this.setState({
    showCrpModal: showCrpModal
  })
}

onClickSave = () => {
  this.props.dispatch(updatePromotion({
    participate: this.state.isOn,
    offer_crp_markdown: this.state.crpValue
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

handleFocusOut(e) {
  const { crpValue } = this.state
  if (crpValue && crpValue !== "" ) {
    const { offerDetails } = this.state;
    if (crpValue && crpValue.indexOf('.') < 0) {
      let wholeNumber = crpValue.substring(0, crpValue.length - 2)
      let decNumber = (crpValue.length === 1) ? "0" + crpValue : crpValue.substring(crpValue.length - 2);
      let decValue = ((wholeNumber === "") ? "0" : wholeNumber) + "." + decNumber;
      if (decValue > MAX_NUMBER || parseFloat(decValue) <= MIN_NUMBER) {

        let maxValue = (offerDetails.editable_fields && offerDetails.offer_crp_markdown != "") ? offerDetails.offer_crp_markdown : "";
        this.setState({
          crpValue: maxValue,
          isDisabled: true
        });
        this.displayMessageBox();
      } else {
        let crpDataValue=`${parseFloat(decValue).toFixed(2)}`;
        let isDisValue = (crpDataValue === `${offerDetails.offer_crp_markdown}`) ? true : false;

        this.setState({
          crpValue: crpDataValue,
          isDisabled: isDisValue
        });
      }
    } else {
      if (crpValue && crpValue > MAX_NUMBER || parseFloat(crpValue) <= MIN_NUMBER) {
        let decValue = (offerDetails.editable_fields && offerDetails.offer_crp_markdown != "") ? offerDetails.offer_crp_markdown : "";
        this.setState({
          crpValue: decValue,
          isDisabled: true
        });

        this.displayMessageBox();
      } else {
        let crpDataValue=`${parseFloat(crpValue).toFixed(2)}`;
        let isDisValue = (crpDataValue === `${offerDetails.offer_crp_markdown}`) ? true : false;
        this.setState({
          crpValue: crpDataValue,
          isDisabled: isDisValue
        });
      }
    }
  } else {
    this.setState({
      crpValue: "",
    });
  }
}

preventdefaultKeys = (e)=>{
  if((DISALLOWED_KEYS.includes(e.key) || DISALLOWED_KEY_CODES.includes(e.keyCode)) && ( !(ALLOWED_KEY_CODES.includes(e.keyCode)) || !VALID_KEYS.includes(e.key) )) {
      e.preventDefault();
  }
}

handleChange(e) {
  let inputCrp = e.target.value;
  if (CRP_REGEX.test(inputCrp)) {
    const { isOn, offerDetails } = this.state;
    if (offerDetails.editable_fields && offerDetails.editable_fields.offer_crp_markdown == true && e.target.value == offerDetails.offer_crp_markdown && isOn === offerDetails.editable_fields.participate) {
      this.setState({
        crpValue: e.target.value,
        isDisabled: true
      });
    } else {
      this.setState({
        crpValue: e.target.value,
        isDisabled: false
      });
    }
  }
}

toggleValue = (isOn) => {
  const { crpValue, offerDetails } = this.state;
  if (isOn === offerDetails.editable_fields.participate) {
    if (offerDetails.editable_fields && offerDetails.editable_fields.offer_crp_markdown == true && crpValue == offerDetails.offer_crp_markdown) {
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
    const {offerDetails, msgBoxBody, showModal, showCrpModal, isDisabled, isOn, crpValue, displaySpinner} = this.state;   
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
              {offerDetails.editable_fields && offerDetails.editable_fields.offer_crp_markdown == true &&
              <p>
                <span className="col-header">Promotion CRP Markdown: $</span>
                <span className="form-group input">
                  <span className="col-right">
                    <small id="promotionCRPMarkdown" className="form-text"> </small>
                    <input type="text" className="form-control" id="promotionCRPMarkdown" name="promotionCRPMarkdown" aria-describedby="Promotion CRP Markdown" 
                    placeholder="Enter CRP" 
                    autoComplete="off"
                    value={crpValue}
                    maxLength="7"
                    type="number"
                    onBlur={(e) => { this.handleFocusOut(e) }}
                    onChange={(e) => {this.handleChange(e)}}
                    onKeyDown={(e) => {this.preventdefaultKeys(e)}}
                    />
                    <label id="promotionCRPMarkdown">Enter CRP</label>
                  </span>
                </span>
              </p>
              }
              {offerDetails.editable_fields && isOn != null &&
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
                onFirstDataRendered={this.onFirstDataRendered.bind(this)}
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
        { showCrpModal &&
            <MessageBox 
              className={"message-box"} 
              initialModalState={false} 
              msgTitle={"Promotion CRP"}
              msgBody={msgBoxBody}
              isCrpValidation={true}
              modalAction={this.crpModalAction}
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
    getItemNames: state.storeOffers.getItemNames && state.storeOffers.getItemNames.payload ? state.storeOffers.getItemNames.payload : {}
  });
}

export default connect(
  mapStateToProps
)(withRouter(PromotionEdit))
