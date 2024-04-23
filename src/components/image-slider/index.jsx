import { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs";
import './styles.css';

export default function ImageSlider({ url, limit, page }) {
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchImages(getUrl) {
        try {
            // https://picsum.photos/v2/list?page=1&limit=5
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

    if (errorMsg !== null) {
        return <div>Error occured! {errorMsg}</div>
    }

    return (
        <div className="container">
            <BsArrowLeftCircleFill className="arrow arrow-left" />
            {
                images && images.length ?
                    images.map((imageItem) => (
                        <img
                            key={imageItem.id}
                            src={imageItem.download_url}
                            alt={imageItem.download_url}
                            className="current-image"
                        />
                    ))
                    : null}
            <BsArrowRightCircleFill className="arrow arrow-right" />
            <span className="circle-indicators">
                {
                    images && images.length ?
                    images.map((_,index) => <button
                    key={index}
                    className="current-indicator">
                    </button>)
                    : null
                }
            </span>
        </div>
    );
}
