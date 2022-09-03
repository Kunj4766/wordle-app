import React, { useMemo, useState } from 'react';

const Row = ({
    gess,
    solution,
    id,
    count
}) => {
    const paddedgess = gess + Array(5 - gess.length).fill(" ").join("");
    let newcolor = "white";
    let bordarcolor = "";
    return (
        <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'center' }}>
            {paddedgess.split("").map((letter, i) => {
                if (letter === " ") {
                    bordarcolor = "#a7adc0"
                } else {
                    bordarcolor = ""
                }
                if (id !== count) {
                    if (gess !== "" && letter !== " " && solution.split("")[i] === letter) {
                        newcolor = "#79b851"
                    } else if (gess !== "" && letter !== " " && solution.split("").includes(letter)) {
                        newcolor = "#f3c237"
                    } else {
                        newcolor = 'white'
                    }
                }
                return (
                    <div key={i} style={{ minHeight: 60, width: 60, border: '2px solid #dee1e9', borderColor: bordarcolor, marginLeft: '10px', textAlign: 'center', backgroundColor: newcolor }}>
                        <div style={{ marginTop: '16px', fontSize: 'x-large', fontWeight: 'bold' }}>
                            {letter}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default React.memo(Row);