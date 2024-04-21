import { Link, useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import { useState, useEffect } from "react";
import { dateStringFormatter } from "../utils/dateStringFormatter";

const InvoiceDetail = () => {

    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        apiGet("/api/invoices/" + id)
            .then(data => setInvoice(data))
            .catch(error => console.error(error));
    }, [id]);

    return (invoice ? (
        <div>
            <h1>Detail faktury</h1>
            <hr />
            <h3 className="mb-4">Faktura č.: {invoice.invoiceNumber}</h3>
            <div className="container">
                <div className="row mb-4">
                    <div className="col">
                        <strong>Dodavatel</strong>
                        <br />
                        id: {invoice.seller._id} <br />
                        jméno: <Link to={"/persons/show/" + invoice.seller._id}> {invoice.seller.name} </Link> <br />
                    </div>
                    <div className="col">
                        <strong>Odběratel</strong>
                        <br />
                        id: {invoice.buyer._id} <br />
                        jméno: <Link to={"/persons/show/" + invoice.buyer._id}>{invoice.buyer.name} </Link> <br />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <strong>Datum vystavení</strong>
                        <br />
                        {dateStringFormatter(invoice.issued, true)}
                    </div>
                    <div className="col">
                        <strong>Datum splatnosti:</strong>
                        <br />
                        {dateStringFormatter(invoice.dueDate, true)}
                    </div>
                </div>
                <p>
                    <strong>Produkt / služba:</strong>
                    <br />
                    {invoice.product}
                </p>
                <p>
                    <strong>Cena:</strong>
                    <br />
                    {invoice.price}
                </p>
                <p>
                    <strong>Daň:</strong>
                    <br />
                    {invoice.vat}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br />
                    {invoice.note}
                </p>
            </div>
            <Link
                to={"/invoices/edit/" + id}
                className="btn btn-sm btn-warning"
            >
                Upravit
            </Link>
        </div>
    ) : (
        <div className="spinner-border text-info" role="status">
            <span className="sr-only">Načítám...</span>
        </div>
    )
    );

}

export default InvoiceDetail;