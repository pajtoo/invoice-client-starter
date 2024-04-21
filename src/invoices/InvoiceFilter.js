import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField";

const InvoiceFilter = ({handleChange, handleSubmit, persons, filter}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <InputSelect
                        name="sellerId"
                        items={persons}
                        handleChange={handleChange}
                        label="Dodavatel"
                        prompt="nevybrán"
                        value={filter.sellerId}
                    />
                </div>
                <div className="col">
                    <InputSelect
                        name="buyerId"
                        items={persons}
                        handleChange={handleChange}
                        label="Odběratel"
                        prompt="nevybrán"
                        value={filter.buyerId}
                    />
                </div>
            </div>
    
            <div className="row">
                <div className="col">
                    <InputField
                        type="text"
                        name="product"
                        handleChange={handleChange}
                        label="Produkt / služba"
                        prompt="neuveden"
                        value={filter.product}
                    />
                </div>
    

                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="minPrice"
                        handleChange={handleChange}
                        label="Cena od"
                        prompt="neuvedena"
                        value={filter.minPrice}
                    />
                </div>

                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="maxPrice"
                        handleChange={handleChange}
                        label="Cena do"
                        prompt="neuvedena"
                        value={filter.maxPrice}
                    />
                </div>
    
                <div className="col">
                    <InputField
                        type="number"
                        min="1"
                        name="limit"
                        handleChange={handleChange}
                        label="Limit počtu faktur"
                        prompt="neuveden"
                        value={filter.limit}
                    />
                </div>
            </div>
    
            <div className="row">
                <div className="col">
                    <input
                        type="submit"
                        className="btn btn-secondary float-right mt-2"
                        value="Filtrovat faktury"
                    />
                </div>
                <div className="col">
                    <input
                        type="submit"
                        className="btn btn-secondary float-right mt-2"
                        value="Filtrovat faktury"
                        
                    />
                </div>
            </div>
        </form>
    );

}

export default InvoiceFilter;