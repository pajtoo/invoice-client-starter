import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import FlashMessage from "../components/FlashMessage";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: {
            _id: ""
        },
        buyer: {
            _id: ""
        },
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: ""

    })

    const [persons, setPersons] = useState([]);

    const [errorState, setErrorState] = useState(null);
    const [successState, setSuccessState] = useState(false);

    // Stažení osob do Selectu kupujících a prodávajících
    useEffect(() => {
        apiGet("/api/persons")
            .then(data => { setPersons(data) });
    }, []);

        useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id)
                .then(data => {
                    setInvoice({
                        invoiceNumber: data.invoiceNumber,
                        seller: {
                            _id: data.seller._id
                        },
                        buyer: {
                            _id: data.buyer._id
                        },
                        issued: data.issued,
                        dueDate: data.dueDate,
                        product: data.product,
                        price: data.price,
                        vat: data.vat,
                        note: data.note
                    })
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (invoice.buyer._id == "" || invoice.seller._id =="")
            setErrorState("Dodavatel i odběratel musí být vyplněn.");
        else (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then(() => {
                setTimeout(() => {
                    navigate("/invoices")
                }, 2000);
                setSuccessState(true);
            })
            .catch((error) => {
                console.log(error.message);
                setErrorState(error.message);
            });

    };

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr />
            {errorState ?
                <FlashMessage theme="danger" text={errorState} /> : null
            }

            {successState ?
                <FlashMessage theme="success" text="Uložení faktury proběhlo úspěšně" /> : null
            }
            <form onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    name="invoiceNumber"
                    prompt="Zadejte číslo faktury"
                    label="Číslo faktury"
                    required={true}
                    handleChange={e => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
                    value={invoice.invoiceNumber}
                />

                <InputSelect
                    items={persons}
                    label="Dodavatel"
                    name="sellersList"
                    prompt="Vyberte dodavatele"
                    handleChange={e => setInvoice({ ...invoice, seller: { _id: e.target.value } })}
                    value={invoice.seller._id}
                />
                <InputSelect
                    items={persons}
                    label="Odběratel"
                    name="buyersList"
                    prompt="Vyberte odběratele"
                    handleChange={e => setInvoice({ ...invoice, buyer: { _id: e.target.value } })}
                    value={invoice.buyer._id}
                />

                <InputField
                    type="date"
                    name="issued"
                    prompt="Zadejte datum vystavení faktury"
                    label="Datum vystavení"
                    required={true}
                    handleChange={e => setInvoice({ ...invoice, issued: e.target.value })}
                    value={invoice.issued}
                />

                <InputField
                    type="date"
                    name="dueDate"
                    prompt="Zadejte datum splatnosti faktury"
                    label="Datum splatnosti"
                    required={true}
                    handleChange={e => setInvoice({ ...invoice, dueDate: e.target.value })}
                    value={invoice.dueDate}
                />

                <InputField
                    type="text"
                    name="product"
                    prompt="Zadejte produkt / službu"
                    label="Produkt / služba"
                    required={true}
                    handleChange={e => setInvoice({ ...invoice, product: e.target.value })}
                    value={invoice.product}
                />

                <InputField
                    type="number"
                    name="price"
                    prompt="Zadejte cenu"
                    label="Cena za produkt / službu"
                    required={true}
                    handleChange={e => setInvoice({ ...invoice, price: e.target.value })}
                    value={invoice.price}
                />

                <InputField
                    type="number"
                    name="vat"
                    prompt="Zadejte výši daně"
                    label="Daň"
                    required={true}
                    handleChange={e => setInvoice({ ...invoice, vat: e.target.value })}
                    value={invoice.vat}
                />

                <InputField
                    type="text"
                    name="note"
                    prompt="Zadejte poznámku"
                    label="Poznámka"
                    handleChange={e => setInvoice({ ...invoice, note: e.target.value })}
                    value={invoice.note}
                />

                <input type="submit" className="btn btn-primary" value="Uložit" />

            </form>
        </div>)
}

export default InvoiceForm;