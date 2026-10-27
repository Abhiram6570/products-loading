


import {useEffect,useState} from "react";



interface productsTypes{
    id:number,
    title:string,
    price:number,
    images:string

}

const FetchApiData = ()=>{
    const [productsData, setProductsData] = useState<productsTypes[]>([]);
    const [loadItems, setLoadItems] = useState(5)

    useEffect(()=>{
        fetch("https://dummyjson.com/products")
                        .then((res)=> res.json())
                        .then((result)=>{
                            setProductsData(result.products)
                            })
    },[]);
                              



 const loadMore = ()=>{
     setLoadItems(prev => prev + 5)
 }

 useEffect(()=>{
    
 },[loadItems])

    return(
        <>
        <div className="container">
    <h1 className="text-center my-4">Products Details</h1>

    <div className="row">
        {
            productsData.length > 0 &&

            productsData.slice(0, loadItems).map((product: productsTypes) => {

                return(
                    <div className="col-md-4 mb-4" key={product.id}>

                        <div className="card h-100 shadow">

                            <img 
                                src={product.images[0]} 
                                className="card-img-top p-3"
                                style={{height:"250px", objectFit:"contain"}}
                            />

                            <div className="card-body text-center">

                                <h5>{product.title}</h5>

                                <h4 className="text-success">
                                    ${product.price}
                                </h4>

                            </div>

                        </div>

                    </div>
                )
            })
        }
    </div>

    <button 
        type="button" 
        className="btn btn-primary d-flex m-auto mb-5"
        onClick={loadMore}
    >
        See More
    </button>

</div>
        

        
        </>
    )
}
export default FetchApiData;