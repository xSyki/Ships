
const letters = ['a','b','c','d','e','f','g','h','i','j'];

function InstructionX() {
    return (
        <div className={`instructionX`}>
            {letters.map((index) => <div key={index} className={`cellCenter instructionCell`}>{index}</div>)}
        </div>
    )
}

export default InstructionX;