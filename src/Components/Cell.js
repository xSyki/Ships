import React from 'react';
import classNames from 'classnames/bind';

class Cell extends React.Component {

    render() {
        //Klasy dla komórek gracz
        let cellClassNames = classNames('cell', { shipOnCell: this.props.shipStatus === "ship"}, { prevShipOnCell: this.props.shipStatus === "previewShip"}, { aiShipOnCell: this.props.shipStatus === "aiShip"}, { shotted: this.props.shipStatus === "shotted"}, { hit: this.props.shipStatus === "hit"}, { sinked: this.props.shipStatus === "sinked"});
        //Klasy dla komórek komputera
        let aiCellClassNames = classNames('cell', { shotted: this.props.shipStatus === "shotted" && !this.props.blindGame}, { hit: this.props.shipStatus === "hit" && !this.props.blindGame}, { sinked: this.props.shipStatus === "sinked" && !this.props.blindGame} );
        return (
            <>
                {this.props.type === "myGameBoard" ? <button onClick={() => this.props.previewShip(this.props.letters.charCodeAt(0) - 97, this.props.rowID)} className={cellClassNames}></button> : ""}
                {this.props.type === "aiGameBoard" ? <button onClick={() => this.props.round(this.props.letters.charCodeAt(0) - 97, this.props.rowID, this.props.shipId)} className={aiCellClassNames}></button> : ""}
            </>
        );
    }
}

export default Cell;