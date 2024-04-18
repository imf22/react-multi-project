import { FaStar } from "react-icons/fa"
import { useState } from "react";
import './styles.css';

export default function StarRating({noOfStars}){
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    function handleClick(getCurrentIndex){
        setRating(getCurrentIndex);
        console.log(getCurrentIndex);
    }

    function handleMouseEnter(getCurrentIndex){
        setHover(getCurrentIndex);
        console.log(getCurrentIndex);
    }

    function handleMouseLeave(){
        setHover(rating);
    }
    return (
        <div className="star-rating">
            {
                [...Array(noOfStars)].map((o ,index) => {
                    index += 1;

                    return <FaStar 
                    key={index}
                    className={index <= (hover || rating)? 'active' : 'inactive'}
                    onClick={() => {handleClick(index)}}
                    onMouseMove={() => {handleMouseEnter(index)}}
                    onMouseLeave={() => {handleMouseLeave()}}
                    size={40}
                    />

                })
            }


        </div>
    )
}