import { useEffect, useState } from "react"
import './styles.css';

export default function LoadMoreData(){
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);

    async function fetchProducts(){
        try{
            setLoading(true);
            
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0? 0 : count * 20}&select=title,price`);
            const result = await response.json();

            if (result && result.products && result.products.length){
                setProducts(result.products);
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
    },[])

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
                        >
                            <img src="https://dummyjson.com/image/400x200" alt={productItem.title} />
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
                <button>Load More Products</button>
            </div>
        </div>
    )
}