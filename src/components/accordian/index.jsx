
// Single Selection

import { useState } from "react"
import data from "./data";
import './styles.css';

// Multiple Selection
export default function Accordian(){
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection,setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSelection(getCurrentId){
        if (enableMultiSelection){
            handleMultiSelection(getCurrentId);
        } else {
            handleSingleSelection(getCurrentId);
        }
    }

    function handleSingleSelection(getCurrentId){
        setSelected(selected === getCurrentId ? null : getCurrentId);
    }

    function handleMultiSelection(getCurrentId){
        // setSelected(null);
        let copyMultiple = [...multiple];
        const findIndex = multiple.indexOf(getCurrentId);

        if (findIndex === -1) copyMultiple.push(getCurrentId)
        else copyMultiple.splice(findIndex, 1)
        // if (multiple.find(getCurrentId))

        setMultiple(copyMultiple);
        console.log(copyMultiple)

    }

    return (
        <div className="wrapper">
            <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>Enable Multi Selection</button>
            <div className="accordian">
                {   
                    (data && (data.length > 0 )) ? 
                    (data.map((dataItem, i) => 
                        (
                            <div className="item">
                                <div className="title" onClick={() => handleSelection(dataItem.id)}>
                                    <h3>{dataItem.question}</h3>
                                    <span>+</span>
                                </div>
                                {   
                                    
                                    enableMultiSelection 
                                    ? multiple.indexOf(dataItem.id) !== -1 && (
                                        <div className="content">{dataItem.answer}</div>
                                    )
                                    : selected === dataItem.id && (
                                        <div className="content">{dataItem.answer}</div>
                                    )


                                    
                                    // (selected === dataItem.id) || (enableMultiSelection && multiple.indexOf(dataItem.id) !== -1) ?
                                    // <div className="content">{dataItem.answer}</div> 
                                    // : null
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