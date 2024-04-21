import React from "react";
import dateStringFormatter from "../utils/dateStringFormatter";
import { Link } from "react-router-dom";

const InvoiceTable = ({ label, invoices, deleteInvoice }) => {
    return (<div className="container">
        <p>{label} {invoices.length}</p>
        <table className="table table-bordered table-striped table-hover table-sm table-responsive">
            <thead className="align-middle text-center sticky-top bg-white">
                <tr>
                    <th>Číslo faktury</th>
                    <th>Dodavatel</th>
                    <th>Odběratel</th>
                    <th>Cena</th>
                    <th>Vystaveno</th>
                    <th>Splatnost</th>
                    <th>Akce</th>
                </tr>
                
            </thead>
            <tbody>
                {invoices.map(invoice => (
                    <tr key={invoice._id}>
                        <td >
                            {invoice.invoiceNumber}
                        </td>
                        <td>
                            <Link to={"persons/show/" + invoice.seller._id} className="nav nav-link">
                                {invoice.seller.name}
                            </Link>
                        </td>
                        <td>
                            <Link to={"persons/show/" + invoice.buyer._id} className="nav nav-link">
                                {invoice.buyer.name}
                            </Link>
                        </td>
                        <td >
                            {invoice.price}
                        </td>
                        <td >
                            {dateStringFormatter(invoice.issued, true)}
                        </td>
                        <td >
                            {dateStringFormatter(invoice.dueDate, true)}
                        </td>
                        <td>
                            <div className="btn-group">
                                <Link
                                    to={"/invoices/show/" + invoice._id}
                                    className="btn btn-sm btn-info"
                                >
                                    Zobrazit
                                </Link>
                                <Link
                                    to={"/invoices/edit/" + invoice._id}
                                    className="btn btn-sm btn-warning"
                                >
                                    Upravit
                                </Link>
                                <button
                                    onClick={() => deleteInvoice(invoice._id)}
                                    className="btn btn-sm btn-danger"

                                >
                                    Odstranit
                                </button>
                            </div>
                        </td>
                    </tr>
                ))

                }
            </tbody>
        </table>

    </div>)
}

export default InvoiceTable;