/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InvoiceTable from "../invoices/InvoiceTable";

import { apiGet } from "../utils/api";
import Country from "./Country";

const PersonDetail = () => {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [issuedInvoices, setIssuedInvoices] = useState(null);
    const [receivedInvoices, setReceivedInvoices] = useState(null);

    let country;

    useEffect(() => {
        apiGet("/api/persons/" + id)
            .then(personData => {
                setPerson(personData);
                return personData;
            })
            .then(personData => {
                apiGet("/api/identification/" + personData.identificationNumber + "/sales")
                    .then(data => { setIssuedInvoices(data); })
                    .catch(error => console.log(error));
                apiGet("/api/identification/" + personData.identificationNumber + "/purchases")
                    .then(data => setReceivedInvoices(data))
                    .catch(error => console.log(error));
                Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";
            })
            .catch(error => console.log(error));

    }, [id]);

    return (
        <>
            {person ? (
                <div>
                    <h1>Detail osoby</h1>
                    <hr />
                    <h3>{person.name} ({person.identificationNumber})</h3>
                    <p>
                        <strong>DIČ:</strong>
                        <br />
                        {person.taxNumber}
                    </p>
                    <p>
                        <strong>Bankovní účet:</strong>
                        <br />
                        {person.accountNumber}/{person.bankCode} ({person.iban})
                    </p>
                    <p>
                        <strong>Tel.:</strong>
                        <br />
                        {person.telephone}
                    </p>
                    <p>
                        <strong>Mail:</strong>
                        <br />
                        {person.mail}
                    </p>
                    <p>
                        <strong>Sídlo:</strong>
                        <br />
                        {person.street}, {person.city},
                        {person.zip}, {country}
                    </p>
                    <p>
                        <strong>Poznámka:</strong>
                        <br />
                        {person.note}
                    </p>
                </div>
            ) : (
                <div className="spinner-border text-info" role="status">
                    <span className="sr-only">Načítám...</span>
                </div>
            )}

            {issuedInvoices ? (
                <InvoiceTable label="Počet vystavených faktur: " invoices={issuedInvoices} />
            ) : (
                <div className="spinner-border text-info" role="status">
                    <span className="sr-only">Načítám...</span>
                </div>
            )}

            {receivedInvoices ? (
                <InvoiceTable label="Počet přijatých faktur: " invoices={receivedInvoices} />
            ) : (
                <div className="spinner-border text-info" role="status">
                    <span className="sr-only">Načítám...</span>
                </div>
            )}
            <Link
                to={"/persons/edit/" + id}
                className="btn btn-sm btn-warning"
            >
                Upravit
            </Link>
        </>
    );
}

export default PersonDetail;
