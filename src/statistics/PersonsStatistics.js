import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

const PersonsStatistics = () => {


    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        apiGet("/api/persons/statistics")
            .then(data => setStatistics(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <h1>Statistiky</h1>
            <table className="table table-bordered table-striped table-sm table-hover">
                <thead className="sticky-top bg-white">
                    <tr>
                        <th>#</th>
                        <th>Jméno / název subjektu</th>
                        <th>Fakturované příjmy</th>
                    </tr>
                </thead>
                <tbody>
                    {statistics ? (statistics.map((stat, index) => (
                        <tr key={index} >
                            <td>{stat.personId}</td>
                            <td>{stat.personName}</td>
                            <td>{stat.revenue}</td>
                        </tr>
                    ))
                    ) : (<p>Načítám...</p>)}
                </tbody>
            </table >
        </>
    );
}

export default PersonsStatistics;