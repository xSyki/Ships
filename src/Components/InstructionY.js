const numbers = ['1','2','3','4','5','6','7','8','9','10'];


function InstructionY() {
    return (
        <div className={`instructionY`}>
            {numbers.map((index) => <div key={index} className={`cellCenter instructionCell`}>{index}</div>)}
        </div>
    )
}

export default InstructionY;