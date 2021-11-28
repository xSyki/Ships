import React from 'react';

class Instruction extends React.Component {

    instructionRender = (stage) => {
        switch (stage) {
            case 'shipSubmitting':
                return (
                <>
                    <p>Kliknij na twoją planszę, aby ustawić statek. Statki nie mogę stać obok siebie.</p>
                    <div>
                        <button className="shipRotate" disabled><i className="fas fa-sync"></i></button> Obracanie statku
                    </div>
                    <div>
                        <button className="shipSubmit" disabled><i className="fas fa-check"></i></button> Zaakceptowanie położenia statku
                    </div>
                    <div className="instructionDiv">
                        <div className="cell cellCenter cellInstruction"></div><p className="instructionText">Puste Pole</p>
                    </div>
                    <div className="instructionDiv">
                        <div className="cell cellCenter cellInstruction prevShipOnCell"></div> Niezaakceptowany statek
                    </div>
                    <div className="instructionDiv">
                        <div className="cell cellCenter cellInstruction shipOnCell"></div> Zaakceptowany statek
                    </div>
                </>
                    )
            case 'shots':
                return (
                    <>
                    <p>Klikaj w planszę przeciwnika, aby strzelać do jego statków.</p>
                    <div className="instructionDiv">
                        <div className="cell cellCenter cellInstruction shotted"></div> Pole, w które był juz oddany strzał
                    </div>
                    <div className="instructionDiv">
                        <div className="cell cellCenter cellInstruction hit"></div> Pole, w które był juz oddany strzał i na którym jest statek
                    </div>
                    <div className="instructionDiv">
                        <div className="cell cellCenter cellInstruction sinked"></div> Statek, który jest zatopiony
                    </div>
                    

                    </>
                )
            default:
                return <p>Przepraszam, skończyły nam się instruckje.</p>
          }
    }

    render() {
        return(
            <div className="instruction">
                <h2>Instrukcja</h2>
                <div className="instructionText"></div>
                {this.instructionRender(this.props.stage)}
            </div>
        );
    }
}

export default Instruction;