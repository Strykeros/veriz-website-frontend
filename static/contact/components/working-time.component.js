class WorkingTime extends React.Component{

    render(){
       let wrapperAttributes = {
            className: this.props.wrapperClass
        }

        let dayAttributes = {
            style: {
                width: "auto"
            }
        }

        let hourAttributes = {
            style: {
                width: "auto"
            }
        }


        let lineAttributes = {
            style: {
                width: "65%",
                height: "1px",
                color: "black"
            }
        }

        let dayText = this.props.dayText;
        let hourText = this.props.hourText;

        let day = ele("p", dayAttributes, dayText);
        let hours = ele("p", hourAttributes, hourText);
        let line = ele("hr", lineAttributes, null);

        return ele("div", wrapperAttributes, day, line, hours);

    }
} 