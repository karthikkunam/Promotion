import React from 'react';

class Footer extends React.Component {
    onClickClose= ()=>{
        const { showModal } = this.state;
        const msgBoxBody = `You have unsaved chnages which will be lost if you navigate away. Would you like to proceed?`;
        this.setState({
            msgBoxBody: msgBoxBody,
            showModal: !showModal
        });   
    }

    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <button id="save-button" className="btn btn-outline-primary">Save</button>
                    <button id="close-button" className="btn btn-outline-secondary mr-3" onClick={this.onClickClose}>Close</button>
                </div>
            </footer>
        );
    }
}

export default Footer;