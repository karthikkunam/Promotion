import React from 'react';
import PromotionLanding from '../promotions/PromotionLanding';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="promotion-landing container-body-right">
                <div className="full-height">
                    <PromotionLanding>

                    </PromotionLanding>
                </div>
            </div>
        );
    }
}

export default Homepage;