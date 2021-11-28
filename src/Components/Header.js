import React from 'react';

class Header extends React.Component {
    render() {
        return(
            <div className="header">
                <h2 className="headerTitle">Wynik:</h2>
                <div className="score">
                    <h3 className="myScore">Ty:{this.props.score.my}</h3>
                    <h3 className="aiScore">Ai:{this.props.score.ai}</h3>
                </div>
            </div>
        )
    }
}

export default Header;