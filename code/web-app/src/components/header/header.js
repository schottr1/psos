import React, { Component } from 'react';
import UserAdmin32 from '@carbon/icons-react/lib/user--admin/20';
import Settings32 from '@carbon/icons-react/lib/settings/20';
import Renew20 from '@carbon/icons-react/lib/renew/20';
import Erase20 from '@carbon/icons-react/lib/erase/20';
import LeftNav from '../leftNav/leftNav';
import Notification20 from '@carbon/icons-react/lib/notification/20';
import Dashboard20 from '@carbon/icons-react/lib/dashboard/20';
import PreferenceModel from './../preference/preferenceModal';
import AlertModel from './../preference/notificationModal';
// import {
//   RadioButtonGroup,
//   RadioButton,
//   FormGroup,
//   Accordion,
//   AccordionItem,
// } from 'carbon-components-react';
import HeaderContainer from 'carbon-components-react/lib/components/UIShell/HeaderContainer';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
} from 'carbon-components-react/lib/components/UIShell';
import './header.scss';

// REVIEW: NEED TO POPULAE THIS DYNAMIC BASED ON USER PREFERENCES
export default class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layerPreference: false,
      alertPreference: false
    }
  }
  layerPreferenceClick = () => {
    this.setState({ layerPreference: !this.state.layerPreference });
  }
  layerPreferenceCancel = () => {
    this.setState({ layerPreference: false });
  }
  alertPreferenceClick = () => {
    this.setState({ alertPreference: !this.state.alertPreference });
  }
  alertPreferenceCancel = () => {
    this.setState({ alertPreference: false });
  }
  render() {
    return (
      <div className="container">
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <Header>
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName href="/" prefix=""><span style={{"margin-left":"250px"}}>IBM Police - Reform </span></HeaderName>
              <HeaderNavigation aria-label="IBM [Platform]">
                <HeaderMenuItem href="#" className="headerTab">
                  Dashboard
                </HeaderMenuItem>
                  <HeaderGlobalAction aria-label="Search" onClick={this.alertPreferenceClick}>
                  <Renew20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Search" onClick={this.alertPreferenceClick}>
                  <Notification20 />
                </HeaderGlobalAction>

                <HeaderGlobalAction
                  aria-label="Notifications"
                  onClick={() => { }}
                >
                  <UserAdmin32 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="App Switcher"
                  onClick={() => { }}
                >
                  <Settings32 />
                </HeaderGlobalAction>
              </HeaderNavigation>
              <HeaderGlobalBar>
               
              </HeaderGlobalBar>
              <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
              >
                <div className="filterOption">
                  <LeftNav></LeftNav>
                </div>
                <div className="prefernce"> 
                </div>
              </SideNav>
            </Header>
          )}
        />
      </div>
    );
  }
}
