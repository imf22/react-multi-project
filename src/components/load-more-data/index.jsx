import { useEffect, useState } from "react"
import './styles.css';

export default function LoadMoreData(){
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disableButton, setDisableButton] = useState(false);

    async function fetchProducts(){
        try{
            setLoading(true);
            
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0? 0 : count * 20}&select=title,price`);
            const result = await response.json();

            if (result && result.products && result.products.length){
                // setProducts((prevData) => [...prevData, ...result.products]);
                setProducts((prevData) => {
                    const newProductIds = new Set(prevData.map(item => item.id));
                    const filteredNewProducts = result.products.filter(item => !newProductIds.has(item.id));
                    return [...prevData, ...filteredNewProducts];
                });
                setLoading(false);
            }   

            console.log(result);
        } catch(error){
            console.log(error);
            setLoading(false);
        }

    }

    useEffect(()=> {
        fetchProducts()
    },[count])

    useEffect (()=> {
        if(products && products.length === 100) setDisableButton(true);
    }, [products])

    if (loading){
        return <div>Content Loading Please wait...</div>
    }



    return (
        <div className="load-content-container">
            <div className="product-container">
                {
                    products && products.length 
                    ? products.map((productItem)=> (
                        <div 
                        key={productItem.id}
                        className="product"
                        style={{backgroundColor: genConsistentMappedColor(productItem.id)}}
                        >
                            <img src="https://dummyjson.com/image/200x180" alt={productItem.title} />
                            <div className="product-header">
                                <h2>{productItem.title}</h2>
                                <p>${productItem.price}</p>
                            </div>
                        </div>
                    ))
                    :null
                }
            </div>
            <div className="button-container">
                {
                    products && products.length === 100
                    ? <div>You have reaced 100 items</div>
                    : null
                }
                <button disabled = {disableButton} onClick= {() => setCount(count + 1)} style= {{margin: "1rem"}}>Load More Products</button>

            </div>
        </div>
    )
}


function genConsistentMappedColor(count){
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let hexColor = "#";

    for (let i = 3; i < 6; i++) {
        hexColor += (hex[((count + 5) * i) % 16]);
        hexColor += (hex[(count * 13) % 16]);
    }

    return hexColor;
}
