import { useState, useEffect } from 'react';
import { apiGet } from '../utils/api.js'

const InvoicesStatistics = (props) => {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        apiGet("/api/invoices/statistics")
            .then(data => setStatistics(data))
            .catch(error => console.log(error));
    }, [props.invoices]);

    return (
        <table className="table bg-light mt-3 mb-1 ">
            <tbody>
                <tr>
                    <td className="py-2 fw-bold me-1">Součet cen za letošní rok:</td>
                    <td>{statistics.currentYearSum}</td>
                    <td className="fw-bold me-1">Součet cen za všechny roky:</td>
                    <td>{statistics.allTimeSum}</td>
                    <td className="fw-bold me-1">Počet faktur v databázi:</td>
                    <td>{statistics.invoicesCount}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default InvoicesStatistics;