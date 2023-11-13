import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCardDetails, IMAGE_URL } from "@/services/api_info";
import '../../src/app/globals.css'

const Details = () => {
    const [details, setDetails] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCardDetails(`movie/${router.query.id}`);
                setDetails(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        if (router.query.id) {
            fetchData();
        }
    }, [router.query.id]);

    return (
        <>
            <h1>{details.original_title}</h1>
        </>
    );
};

export default Details;