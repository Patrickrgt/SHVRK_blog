import React, {useEffect, useState} from "react";
import sanityClient from "../client.js"

export default function FashionCategory() {
    const [allFashionData, setAllFashion] = useState(null);

        useEffect(() => {
            sanityClient.fetch(
                `*[_type == "post"]{
                    title,
                    slug,
                    mainImage{
                        asset->{
                            _id,
                            url
                        }
                    }
                }`
            )
            .then((data) => setAllFashion(data))
            .catch(console.error);
        }, []);

        return (
            <div>
                {allFashionData.map((post, index) => {
                    <h1>post.slug.current</h1>
                })}
            </div>
        )

}