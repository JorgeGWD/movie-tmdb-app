import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDetails, IMAGE_URL } from "@/services/api_info";

const details = () => {

    const [details, setDetails] = useState([])

    const router = useRouter()

    console.log(router.query.id)
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${'615656'}?language=en-US`)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }, []);


    return (
        <>
            <h1>Detalles</h1>
        </>
    )
}

export default details