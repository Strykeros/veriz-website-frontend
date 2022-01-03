class Properties extends React.Component{

    render(){
        let propertyAttributes = {
            className: "property",
        }

        let headingAttributes = {

        }

        let descAttributes = {

        }

        let headingTxt = this.props.headingText
        let descTxt = this.props.descText

        let heading = ele("p", null, headingTxt);
        let desc = ele("p", null, descTxt);

        return ele("div", propertyAttributes, heading, desc);

    }
}