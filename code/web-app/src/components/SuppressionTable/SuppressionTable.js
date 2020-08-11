import React from "react";
import { render } from "react-dom";

const SupressionTable = (props) => {
    return (
    <div> 
        <div className="bx--grid fullContainerGrid">
        <div className="bx--row padding-0">
        <div className="bx--col-xlg-16 bx--col-lg-16 bx--col-md-8">
            <div className="bx--row padding-0">
            <div
                className="bx--col-xlg-11 bx--col-lg-11 bx--col-md-5 bx--col-sm-4"
                id={
                props.isMobileView === true
                    ? 'leftContainerWraper_mobile'
                    : 'leftContainerWraper'
                }
            >
                <div className="mapContainer">
                <span className="minimize">
                    <span className="mimizeIcon">
                    <Minimize20 />
                    </span>
                    <Settings32 />
                </span>
                <> <h3>Welcome Back, Jane</h3></>
                <><div style={{"padding":"10px"}}>Since Your Last Login: 
                <h4><span style={{"color":"yellow"}}>{props.rowcount}</span>  Filed orders&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{"color":"yellow"}}>0</span> Verified orders</h4></div></>
                    <div className='Form-module--buttonRow'>
                    <div className="orderSearch"> 
                    <Search
                        className="some-class"
                        closeButtonLabelText="Clear search input"
                        defaultValue=""
                        id="search-1"
                        labelText="Search"
                        name=""
                        onChange={props.handleChange}
                        placeHolderText="Search officer name, agency, or case #"
                        size="xl"
                        type="text"
                        /> </div>
                    <div className="ordernew"> 
                        <button className='Form-module--button bx--btn bx--btn--primary' type='button' onClick={props.layerPreferenceClick} >New +</button>
                        <div className={!props.layerPreference ? 'hide' : ''}>
                        <PreferenceModel layerPrefCancel={props.layerPreferenceCancel} />
                        </div>
                        </div>
                        </div>
                        </div>
                        <div className="datatab">
                <>
                    <DataTable isSortable
                rows={rows}
                    headers={headers}
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
                    </>
                </div>

                
            </div>
            <div
                className="bx--col-xlg-5 bx--col-lg-5 bx--col-md-3 bx--col-sm-4 "
                id={
                props.isMobileView === true
                    ? 'rightContainerWraper_mobile'
                    : 'rightContainerWraper'
                }
            >
                <div className="rightContainer">
                <NewsAndAlert
                    newsDetails={newsDetailsState}
                    alertDetail={alertDetailState}
                />
                {/* <div className="newsTitle"> News Feed<span className="minimize"><span className="mimizeIcon"><Minimize20 /></span><Settings32 /></span></div> */}
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  )
};
