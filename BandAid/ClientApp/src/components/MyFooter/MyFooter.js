import React from 'react';
import './MyFooter.scss';

class MyFooter extends React.Component {
  render() {
    const bandAidText = 'Band★Aid';

    return (
            <footer className="footer">
                <div className="footerContent">
                    <span className="footerText">{bandAidText}</span>
                </div>
            </footer>
    );
  }
}

export default MyFooter;
