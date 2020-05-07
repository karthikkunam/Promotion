import React from 'react';

export class GroupRowInnerRenderer extends React.Component {
  constructor(props) {
    super(props);

    const node = this.props.node.key;
    console.log(node);
   // const aggData = node.aggData;
   // let flagCode = this.props.flagCodes[node.key];
    this.state = {
        groupData: node,
        rowData: this.props.agGridReact.gridOptions.rowData,
        groupId:''
    };
  }

  componentDidMount() {
    const { rowData, groupData } = this.state;

    if (rowData) {
      let groupID = '';
      rowData.forEach(function (item) {
        if (item.psa.psaDescription == groupData) {
          groupID = item.psa.orderGroupCode;
        }
      });
      this.setState({
        groupId: groupID
      })
    }
  }

  render() {
    return (
        <div style={{display: "inline-block"}}>
          <span className="groupTitle">Group Description: {this.state.groupData}</span>
          <span className="ag-group-child-count"> | </span>
          <span className="groupTitle">Group ID: {this.state.groupId}</span>
        </div>
    );
}

}
export default GroupRowInnerRenderer;