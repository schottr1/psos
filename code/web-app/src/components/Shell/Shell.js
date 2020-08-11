// ------------------------------------------------
// PLEASE DO NOT EDIT. FORK IF YOU NEED TO MODIFY.
// ------------------------------------------------

import React from "react";
import { render } from "react-dom";

import { AppSwitcher20, Notification20, Search20, Fade16, UserAvatar20, Analytics20, DocumentTasks20 } from '@carbon/icons-react';

import HeaderContainer from "carbon-components-react/lib/components/UIShell/HeaderContainer";
import {
  Content,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem
} from "carbon-components-react/lib/components/UIShell";

import { DataTable, Table, TableHead, TableHeader, TableBody, TableCell, TableContainer, TableRow } from 'carbon-components-react';

import SupressionTable from '../SuppressionTable';

const StoryContent = (props) => {
  const content = (
    <div className="bx--grid">
      <div className="bx--row">
        <section className="bx--offset-lg-3 bx--col-lg-13">
          <h2
            style={{
              fontWeight: "normal",
              margin: "30px 0",
              fontSize: "40px"
            }}
          >
            Welcome back, Jane!
          </h2>
          
          <p style={{ lineHeight: "20px"}}>
            Since you last visited:
          </p>

        </section>
      </div>

      <div className="bx--row" style={{margin: "30px"}}>
        <div class="bx--col-lg-2 bx--col-md-1"><Analytics20 /></div>
        <div class="bx--col-lg-2 bx--col-md-1">45</div>
        <div class="bx--col-lg-4 bx--col-md-2 bx--col-sm-1">Filed Orders</div>
        <div class="bx--col-lg-2 bx--col-md-1"/>
        <div class="bx--col-lg-2 bx--col-md-1"/>
        <div class="bx--col-lg-2 bx--col-md-1"/>
        <div class="bx--col-lg-2 bx--col-md-1"/>
      </div>

      <div className="bx--row" style={{margin: "30px"}}>
        <div class="bx--col-lg-2 bx--col-md-1"><DocumentTasks20 /></div>
        <div class="bx--col-lg-2 bx--col-md-1">9</div>
        <div class="bx--col-lg-4 bx--col-md-2 bx--col-sm-1">Verified Orders</div>
        <div class="bx--col-lg-2 bx--col-md-1"/>
        <div class="bx--col-lg-2 bx--col-md-1"/>
        <div class="bx--col-lg-2 bx--col-md-1"/>
        <div class="bx--col-lg-2 bx--col-md-1"/>
      </div>

      <div className="bx--row" style={{margin: "30px"}}>
        <DataTable isSortable
          rows={[]}
          headers={[
            {
              key: 'officerName',
              header: 'Officer Name'
            },
            {
              key: 'officerBadge',
              header: 'Badge #'
            },
            {
              key: 'officerAgency',
              header: 'Law Enforcement Agency'
            },
            {
              key: 'caseNum',
              header: 'Case #'
            },
            {
              key: 'orderDate',
              header: 'Order Date'
            }
          ]}
          render={({ rows, headers, getHeaderProps }) => (
            <TableContainer title="Suppression Orders Database">
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader key={header.key} {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        />
      </div>
          

    </div>
  );

  return <Content id="main-content">{content}</Content>;
};

const Shell = () => (
  <div className="container">
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="Supression Order Project">
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName href="#" prefix="IBM">
              Supression Order Project
            </HeaderName>
            <HeaderGlobalBar>
              <HeaderGlobalAction aria-label="Profile" onClick={() => {}}>
                <UserAvatar20 />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
            <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
              <SideNavItems>
                <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                  Database
                </SideNavLink>
                <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                  Submit a new order
                </SideNavLink>
                <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                  About this project
                </SideNavLink>
                <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                  Your profile
                </SideNavLink>
              </SideNavItems>
            </SideNav>
          </Header>
          <StoryContent />
        </>
      )}
    />
  </div>
);

export default Shell;