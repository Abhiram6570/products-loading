import { useEffect, useRef, useState } from "react";

interface productsTypes {
    id: number,
    title: string,
    price: number,
    images: string[]
}

const FetchApiData = () => {

    const [productsData, setProductsData] = useState<productsTypes[]>([]);

    // generator reference
    const generatorRef = useRef<Generator<productsTypes[], void, unknown> | null>(null);

    // generator function
    function* productsGenerator(products: productsTypes[]) {

        let index = 0;

        while(index < products.length) {

            // give 5 products at a time
            yield products.slice(index, index + 5);

            index += 5;
        }
    }

    useEffect(() => {

        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((result) => {

                // create generator
                generatorRef.current = productsGenerator(result.products);

                // first 5 products
                const firstLoad = generatorRef.current.next().value;

                if(firstLoad){
                    setProductsData(firstLoad);
                }

            })

    }, []);




    const loadMore = () => {

        if(generatorRef.current){

            const nextProducts = generatorRef.current.next().value;

            if(nextProducts){

                setProductsData(prev => [...prev, ...nextProducts]);

            } else {
                alert("No More Products");
            }
        }
    };



    return (
        <>
            <div className="container">

                <h1 className="text-center my-4">
                    Products Details
                </h1>

                <div className="row">

                    {
                        productsData.map((product: productsTypes) => {

                            return (

                                <div className="col-md-4 mb-4" key={product.id}>

                                    <div className="card h-100 shadow">

                                        <img
                                            src={product.images[0]}
                                            className="card-img-top p-3"
                                            style={{
                                                height: "250px",
                                                objectFit: "contain"
                                            }}
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