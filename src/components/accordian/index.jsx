
// Single Selection

import { useState } from "react"
import data from "./data";

// Multiple Selection
export default function Accordian(){
    const [selected, setSelected] = useState(null);

    function handleSingleSelection(getCurrentId){
        // console.log(getCurrentId);
        // if (selected === getCurrentId){
        //     setSelected(null);
        // } else {
        //     setSelected(getCurrentId);
        // }

        setSelected(selected === getCurrentId ? null : getCurrentId);

    }

    return (
        <div className="wrapper">
            <div className="accordian">
                {   
                    (data && (data.length > 0 )) ? 
                    (data.map((dataItem, i) => 
                        (
                            <div className="item">
                                <div className="title" onClick={() => handleSingleSelection(dataItem.id)}>
                                    <h3>{dataItem.question}</h3>
                                    <span>+</span>
                                </div>
                                {
                                    selected === dataItem.id ?
                                    <div className="content">{dataItem.answer}</div> 
                                    : null
                                }
                            </div>
                        )
                    )) 
                    : (
                        <div>No data found...</div>
                    )
                }
            </div>
        </div>
    );
}       