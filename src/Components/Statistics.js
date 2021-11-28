import React from 'react';

class Statistics extends React.Component {

    openFields(board) {
        let openFields = 0;

        board.map(column => column.map(cell => {if(cell === "shotted" || cell === "hit" || cell === "sinked") openFields++}))

        return <span>{openFields}</span>;
    }

    sinkedShips(ships) {
        let sinkedShips = 0;

        ships.map(ship => {if(ship.lifes === 0) sinkedShips++;})

        return sinkedShips;
    }

    shots() {
        return <span></span>
    }

    shotsFired() {
        return <span></span>
    }

    render() {
        return(
            <div className="statistics">
                <h2 className="statisticsTitle">Statystyki</h2>
                <table>
                    <tr>
                        <div></div>
                        <th>Ty</th>
                        <th>Komputer</th>
                    </tr>
                    <tr>
                        <td>Trafione strzały</td>
                        <td>{this.props.hitShots}/{this.props.shots}</td>
                        <td>{this.props.aiHitShots}/{this.props.aiShots}</td>
                    </tr>
                    <tr>
                        <td>Odkryte pola</td>
                        <td>{this.openFields(this.props.statusOfAiGameBoard)}/100</td>
                        <td>{this.openFields(this.props.statusOfMyGameBoard)}/100</td>
                    </tr>
                    <tr>
                    <td>Zatopione statki</td>
                    <td>{this.sinkedShips(this.props.myShips)}/10</td>
                    <td>{this.sinkedShips(this.props.aiShips)}/10</td>

                    </tr>
                </table>
            </div>
        )
    }
}

export default Statistics;