import React from 'react';
import "./Rank.css";

const Rank = ({name, entries}) => {
    return(
        <div >
            <div className="rank1">
                {`${name}, your curent entry count is... `}
            </div>
            <div className="rank2">
                {entries}
            </div>
        </div>
    )
}

export default Rank;