class PolicyParagraph extends React.Component{

    render(){
        let pWrapAttributes = {
            className: "paragraph-wrapper"
        }

        let pHeadingAttributes = {
            className: "p-header"
        }

        let pAttributes = {
            className: "policy-paragraph"
        }

        let headingTxt = this.props.headingText;
        let pTxt = this.props.pText;

        let heading = ele("h4", pHeadingAttributes, headingTxt);
        let content = ele("p", pAttributes, pTxt);
        let parent = ele("div", pWrapAttributes, heading, content);

        return parent;
    }
}