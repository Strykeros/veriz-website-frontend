class InfoParent extends React.Component{

    render(){
        let parentAttributes = {
            className: "info-parent row"
        }

        let wrapperAttributes = {
            className: this.props.wrapClass
        }

        let childAttributes = {
            className: this.props.className
        }

        let child = ele("div", childAttributes, null);
        let wrapper = ele("div", wrapperAttributes, child);
        return ele("div", parentAttributes, wrapper);

    }
}