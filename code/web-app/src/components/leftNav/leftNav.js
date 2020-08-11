import React, { Component } from 'react'
import {
  RadioButtonGroup,
  RadioButton,
  FormGroup,
  Accordion,
  Checkbox,
  AccordionItem,
  Select,
  SelectItem,
  SelectItemGroup,
  TooltipDefinition

} from 'carbon-components-react';
import './leftNav.scss';
import AddAlt20 from "@carbon/icons-react/lib/add--alt/20";

export default class leftNav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      covidOption: true,
      stormOption: false,
      earthquakesOption: false
    }
  }
  riskSelection = (e) => {
    document.getElementById(e.target.id).checked = true;
    if (e.target.id === 'covid') {
      this.setState({ covidOption: true, stormOption: false, earthquakesOption: false });
    } else if (e.target.id === 'storms') {
      this.setState({ stormOption: true, covidOption: false, earthquakesOption: false });
    } else if (e.target.id === 'earthquakes') {
      this.setState({ stormOption: false, covidOption: false, earthquakesOption: true });
    } else if (e.target.id === 'other') {
      this.setState({ stormOption: false, covidOption: false, earthquakesOption: false });
    }
  }
  render() {
    return (
      <div> 
      </div>
    )
  }
}
