import React, { useState, useEffect } from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import { Link } from "react-router-dom";
import FlashMessage from "../components/FlashMessage";
import InvoiceFilter from "./InvoiceFilter";
import InvoicesStatistics from "../statistics/InvoicesStatistics";

const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [personList, setPersonList] = useState([]);
    const [filter, setFilter] = useState({
        buyerId: undefined,
        sellerId: undefined,
        product: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        limit: 20
    });

    const [errorState, setErrorState] = useState(null);

    useEffect(() => {
        apiGet("/api/invoices")
            .then(data => { setInvoices(data) })
            .catch(error => {
                console.log(error);
                setErrorState("Nastala chyb při načítání faktur: " + error.message);
            });
        apiGet("/api/persons") // Stažení osob pro Select kupujících a prodávajících ve filtru    
            .then(data => { setPersonList(data) })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        }
        catch (error) {
            console.log(error);
            setErrorState("Nastala chyba při mazání faktury: " + error.message);
        }
        setInvoices(invoices.filter((invoice) => invoice._id !== id));
    }


    const handleChange = (e) => {    // předáváme filtru
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: undefined }
            });
        }
        else {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: e.target.value }
            });
        }
    }

    const handleSubmit = async (e) => {     //předáváme filtru
        e.preventDefault();
        const params = filter;

        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
    };

    return (<div>

        <InvoiceFilter filter={filter} handleChange={handleChange} handleSubmit={handleSubmit} persons={personList} />

        <InvoicesStatistics invoices={invoices} />
        <h1>Seznam faktur</h1>
        {errorState ? <FlashMessage theme="danger" text={errorState} /> :
            <InvoiceTable label="Počet faktur: " invoices={invoices} deleteInvoice={deleteInvoice} />}

        <Link to={"/invoices/create"} className="btn btn-success">Nová faktura</Link>
    </div>);
}

export default InvoiceIndex;