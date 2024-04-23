import { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs";
import './styles.css';

export default function ImageSlider({ url, limit, page }) {
    const [images, setImages] = useState([]);                   // Images retrived from picsum API
    const [currentSlide, setCurrentSlide] = useState(0);        // The Currently Active Image
    const [errorMsg, setErrorMsg] = useState(null);             // Contains the error message should API return error
    const [loading, setLoading] = useState(false);              // Tracks if API has yet to return a response

    function handlePrevious(){
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
    }

    function handleNext(){
        setCurrentSlide(currentSlide === (images.length - 1) ? 0 : currentSlide + 1)
    }

    function handleJumpTo(jumpToIndex){
        setCurrentSlide(jumpToIndex);
    }



    async function fetchImages(getUrl) {
        try {
            // FORMAT: https://picsum.photos/v2/list?page=1&limit=5
            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();

            if (data) {
                setImages(data);
                setLoading(false);
            }

        } catch (error) {
            setErrorMsg(error.message);
            setLoading(false);
        }
    }

    

    useEffect(() => {
        if (url !== '') fetchImages(url);
    }, [url]);

    console.log(images);

    // Fallback if images are not yet loaded
    if (loading) {
        return <div>Loading data...</div>;
    }

    // Displays API error
    if (errorMsg !== null) {
        return <div>Error occured! {errorMsg}</div>
    }

    return (
        <div className="container">
            <BsArrowLeftCircleFill onClick={handlePrevious} className="arrow arrow-left" />
            {
                images && images.length ?
                    images.map((imageItem) => (
                        <img
                            key={imageItem.id}
                            src={imageItem.download_url}
                            alt={imageItem.download_url}
                            className={imageItem.id === currentSlide.toString() 
                                ? "current-image"                   // Display Current Images
                                : "current-image hidden-image"}     // Apply hidden styling 
                        />
                    ))
                    : null}

                    {/* By applying a hidden styling instead of simply not returning a jsx element,
                    the images are all loaded at once upon they have been received and will not
                    have to load each time they are displayed*/}
            <BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right" />
            <span className="circle-indicators">
                {
                    images && images.length ?
                    images.map((_,index) => <button
                    key={index}
                    onClick={()=> handleJumpTo(index)}
                    className={index === currentSlide
                        ? "current-indicator" 
                        : "current-indicator inactive-indicator"}>
                    </button>)
                    : null
                }
            </span>
        </div>
    );
}
