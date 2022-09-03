import React from 'react';
import Row from './Row'
const List = ({
    solution,
    gesses,
    count,
}) => {
    let myindex = 0;
    return (
        gesses.map((gess,index) => {
            if(gess !== "") {
                myindex = index;
            }
            return (
                <Row key={index} count={count} id={myindex} gess={gess} solution={solution}/>
            )
        })
    )
};
export default React.memo(List);