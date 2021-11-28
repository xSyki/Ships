import React from 'react';

import classNames from 'classnames/bind';


class Ship extends React.Component {

    state = {
        x: "",
        y: ""
    }

    shipCell(mast) {
        let cells =[]
        for(let i = 0; i < mast; i++) {
            cells.push(<div className="shipCell"></div>);

        }
        return cells;
    }

    handleX = (e) => {
        this.setState({
            x: e.target.value
        })
    }
    handleY = (e) => {
        this.setState({
            y: e.target.value
        })
    }

    render() {
        {this.props.setNowShipID(this.props.id)}

        let shipPreviwClassNames = classNames('shipPreview', { shipCellRotate: this.props.rotated});

        return(
            <div className="shipsSelect">
                <h2 className="shipSelectTitle">{this.props.name}</h2>
                <div className={shipPreviwClassNames}>
                    {this.shipCell(this.props.mast)}
                </div>
                

                <div className="shipSelectButtons">
                    {/* <label className="shipSelectX">x: <input type="text" value={this.state.x} onChange={this.handleX}/>(a-j)</label>
                    <label className="shipSelectY">y: <input type="number" value={this.state.y} onChange={this.handleY}/>(1-10)</label> */}
                    {this.props.mast === 1 ? "" : <button className="shipRotate" onClick={() => this.props.rotate(this.props.id)}><i className="fas fa-sync"></i></button>}
                    <button className="shipSubmit" onClick={() => this.props.submit(this.props.id, this.props.mast, this.props.rotated)}><i className="fas fa-check"></i></button>
                </div>
            </div>
        )
    }
}

export default Ship;