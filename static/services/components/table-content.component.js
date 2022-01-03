class TableContent extends React.Component{

    render(){

        let trAttributes = {
            className: "service-row",
        }

        let serviceAtrributes = {
            className: "service-cell",
            style: {
                border: "2px solid black", 
                fontSize: "18px", 
                textAlign: "center"
            }
        }

        let priceAtrributes = {
            className: "price-cell",
            style: {
                border: "2px solid black", 
                fontSize: "18px", 
                textAlign: "center"
            }
        }

        let tdText = this.props.cellTxt;
        let tdText2 = this.props.cellTxt2;


        let serviceCell = ele("td", serviceAtrributes, tdText);
        let priceCell = ele("td", priceAtrributes, tdText2);

        let tr = ele("tr", trAttributes, serviceCell, priceCell);

        return tr;
    }
}