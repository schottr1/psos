import React, { Component } from 'react'
import { Modal } from "carbon-components-react";
import {
    Tab, Tabs, RadioButtonGroup, RadioButton,
    Checkbox, Slider, DataTable, Select, SelectItem,
    TextArea, FormGroup, TextInput
} from 'carbon-components-react';
import Edit20 from '@carbon/icons-react/lib/edit/20';
import View20 from '@carbon/icons-react/lib/view/20';
import Save20 from '@carbon/icons-react/lib/save/20';
import AddAlt20 from "@carbon/icons-react/lib/add--alt/20";
import TrashCan20 from "@carbon/icons-react/lib/trash-can/20";
const {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TableHeader,
    TableSelectAll,
    TableSelectRow
} = DataTable;
export default class notificationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customLocationFlag: false
        }
    }

    customLocationClick = () => {
        console.log("coustom flag", this.state.customLocationFlag);
        this.setState({ customLocationFlag: !this.state.customLocationFlag });
    }
    render() {
        var rows = [
            {
                'id': 'alllocation_1',
                'location': 'All Locations'
            },
            {
                'id': 'alllocation_2',
                'location': 'Impacting Locations'
            }
        ]
        var notificarionData = [
            {
                'id': 'notifications_1',
                'notifications': 'Notification ABC'
            },
            {
                'id': 'notifications_2',
                'notifications': 'Notification DEF'
            }
        ];
        const headersNotification = [
            {
                key: 'notifications',
                header: 'My notifications:',
            }
        ];

        const headers = [
            {
                key: 'location',
                header: 'Select the notification method for each option below:',
            }
        ];
        const self = this.state;
        return (
            <div class="">
                <Modal
                    className="some-class"
                    hasScrollingContent={false}
                    iconDescription="Close the modal"
                    modalAriaLabel=""
                    modalHeading="Notification Preference"
                    modalLabel=""
                    onBlur={function noRefCheck() { }}
                    onClick={function noRefCheck() { }}
                    onFocus={function noRefCheck() { }}
                    onKeyDown={function noRefCheck() { }}
                    onRequestClose={this.props.layerPrefCancel}
                    onRequestSubmit={function noRefCheck() { }}
                    onSecondarySubmit={this.props.layerPrefCancel}
                    open
                    passiveModal={false}
                    primaryButtonDisabled={false}
                    primaryButtonText="Save"
                    secondaryButtonText="Cancel"
                    selectorPrimaryFocus="[data-modal-primary-focus]"
                    size={'lg'}
                >
                    <p className="bx--modal-content__text ">
                        <Tabs
                            ariaLabel="listbox"
                            className="secondaryTab"
                            iconDescription="show menu options"
                            onKeyDown={function noRefCheck() { }}
                            onSelectionChange={function noRefCheck() { }}
                            role="navigation"
                            selected={0}
                            tabContentClassName="tab-content"
                            triggerHref="#"
                            type="default"
                        >
                            <Tab
                                href="#"
                                id="locationNotification"
                                label="Location"
                                role="presentation"
                                selected={false}
                                tabIndex={0}
                            >
                                <div className="locationNotification-content tabContentForMyNotification">
                                    <DataTable
                                        rows={rows}
                                        headers={headers}
                                        render={({ rows, headers, getHeaderProps, getSelectionProps }) => (
                                            <TableContainer >
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>

                                                            {headers.map(header => (
                                                                <TableHeader {...getHeaderProps({ header })}>
                                                                    {header.header}
                                                                </TableHeader>
                                                            ))}
                                                            <th ><span className="bx--table-header-label">Email</span></th>
                                                            <th><span className="bx--table-header-label">Push</span></th>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rows.map(row => (
                                                            <TableRow key={row.id}>
                                                                {row.cells.map(cell => (
                                                                    <TableCell key={cell.id}>{cell.value}</TableCell>
                                                                ))}
                                                                <TableSelectRow {...getSelectionProps({ row })} />
                                                                <TableSelectRow {...getSelectionProps({ row })} />
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        )}
                                    />

                                    <div className="customLocationtypes">
                                        <a onClick={this.customLocationClick} >
                                            {!self.customLocationFlag &&
                                                <AddAlt20 />
                                            }
                                            {self.customLocationFlag &&
                                                <Save20 />
                                            }
                                        </a>
                                        Add custom location or region
                                        {self.customLocationFlag &&
                                            <div className="AlertSubTypes">
                                                <RadioButtonGroup
                                                    defaultSelected="default-selected"
                                                    labelPosition="right"
                                                    legend="Group Legend"
                                                    name="locationOrRegion"
                                                    onChange={function noRefCheck() { }}
                                                    orientation="horizontal"
                                                    valueSelected="default-selected"
                                                >
                                                    <RadioButton
                                                        className="some-class"
                                                        id="exactLocation"
                                                        labelText="Select exact location"
                                                        value="exactLocation"
                                                    />
                                                    <RadioButton
                                                        className="some-class"
                                                        id="regionMap"
                                                        labelText="Draw region on map"
                                                        value="regionMap"
                                                    />
                                                </RadioButtonGroup>
                                                <div className="forLocationSelectBox">
                                                    <Select
                                                        className="some-class"
                                                        defaultValue="placeholder-item"
                                                        disabled={false}
                                                        helperText=""
                                                        id="select-1"
                                                        inline={false}
                                                        invalid={false}
                                                        invalidText="A valid value is required"
                                                        labelText="Country"
                                                        light={false}
                                                        onChange={function noRefCheck() { }}
                                                        size="xl"
                                                    >
                                                        <SelectItem
                                                            disabled
                                                            hidden
                                                            text="United States"
                                                            value="placeholder-item"
                                                        />

                                                    </Select>

                                                    <Select
                                                        className="some-class"
                                                        defaultValue="placeholder-item"
                                                        disabled={false}
                                                        helperText=""
                                                        id="select-1"
                                                        inline={false}
                                                        invalid={false}
                                                        invalidText="A valid value is required"
                                                        labelText="State"
                                                        light={false}
                                                        onChange={function noRefCheck() { }}
                                                        size="xl"
                                                    >
                                                        <SelectItem
                                                            disabled
                                                            hidden
                                                            text="Select state/province"
                                                            value="placeholder-item"
                                                        />

                                                    </Select>

                                                    <Select
                                                        className="some-class"
                                                        defaultValue="placeholder-item"
                                                        disabled={false}
                                                        helperText=""
                                                        id="select-1"
                                                        inline={false}
                                                        invalid={false}
                                                        invalidText="A valid value is required"
                                                        labelText="County"
                                                        light={false}
                                                        onChange={function noRefCheck() { }}
                                                        size="xl"
                                                    >
                                                        <SelectItem
                                                            disabled
                                                            hidden
                                                            text="Select county"
                                                            value="placeholder-item"
                                                        />

                                                    </Select>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Tab>
                            <Tab
                                href="#"
                                id="stromeNotification"
                                label="Storm Type"
                                role="presentation"
                                selected={false}
                                tabIndex={0}
                            >
                                <div className="stromeNotification-content tabContentForMyNotification">
                                    <div className="stromContainer">
                                        <div className="notificationSlider">
                                            <Slider
                                                ariaLabelInput="Label for slider value"
                                                disabled={false}
                                                hideTextInput={true}
                                                id="slider"
                                                inputType="number"
                                                labelText="Drag slider to select storm levels to include in notifications:"
                                                light={false}
                                                max={100}
                                                maxLabel=""
                                                min={0}
                                                minLabel=""
                                                name=""
                                                onChange={function noRefCheck() { }}
                                                onRelease={function noRefCheck() { }}
                                                step={15}
                                                stepMultiplier={5}
                                                value={25}
                                            >
                                            </Slider>
                                        </div>
                                        <div className="emailCheck">
                                            <div className="stromeLabel">
                                                Email
                                            </div>
                                            <Checkbox
                                                className="some-class"
                                                id="stromEmail_1"
                                                indeterminate={false}
                                                labelText=""
                                                onChange={function noRefCheck() { }}
                                                wrapperClassName=""
                                            />
                                        </div>
                                        <div className="pushCheck">
                                            <div className="stromeLabel">
                                                Push
                                              </div>
                                            <Checkbox
                                                className="some-class"
                                                id="stromPush_1"
                                                indeterminate={false}
                                                labelText=""
                                                onChange={function noRefCheck() { }}
                                                wrapperClassName=""
                                            />
                                        </div>

                                    </div>
                                </div>
                            </Tab>
                            <Tab
                                href="#"
                                id="severityNotification"
                                label="Severity"
                                role="presentation"
                                selected={false}
                                tabIndex={0}
                            >
                                <div className="severityNotification-content tabContentForMyNotification">
                                    <div className="severityNotificationContainer">
                                        <div className="notificationSlider">
                                            <Slider
                                                ariaLabelInput="Label for slider value"
                                                disabled={false}
                                                hideTextInput={true}
                                                id="slider"
                                                inputType="number"
                                                labelText="Drag slider to select severity levels to include in notifications:"
                                                light={false}
                                                max={100}
                                                maxLabel=""
                                                min={0}
                                                minLabel=""
                                                name=""
                                                onChange={function noRefCheck() { }}
                                                onRelease={function noRefCheck() { }}
                                                step={15}
                                                stepMultiplier={5}
                                                value={25}
                                            >
                                            </Slider>
                                        </div>
                                        <div className="emailCheck">
                                            <div className="severityLabel">
                                                Email
                                            </div>
                                            <Checkbox
                                                className="some-class"
                                                id="severityEmail_1"
                                                indeterminate={false}
                                                labelText=""
                                                onChange={function noRefCheck() { }}
                                                wrapperClassName=""
                                            />
                                        </div>
                                        <div className="pushCheck">
                                            <div className="severityLabel">
                                                Push
                                              </div>
                                            <Checkbox
                                                className="some-class"
                                                id="severityPush_1"
                                                indeterminate={false}
                                                labelText=""
                                                onChange={function noRefCheck() { }}
                                                wrapperClassName=""
                                            />
                                        </div>

                                    </div>
                                </div>
                            </Tab>

                            <Tab
                                href="#"
                                id="myNotification"
                                label="My Notification "
                                role="presentation"
                                selected={false}
                                tabIndex={0}
                            >
                                <div className="myNotification-content tabContentForMyNotification">
                                    <DataTable
                                        rows={notificarionData}
                                        headers={headersNotification}
                                        render={({ rows, headers, getHeaderProps, getSelectionProps }) => (
                                            <TableContainer >
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>

                                                            {headers.map(header => (
                                                                <TableHeader {...getHeaderProps({ header })}>
                                                                    {header.header}
                                                                </TableHeader>
                                                            ))}
                                                            <th><span className="bx--table-header-label"></span></th>
                                                            <th ><span className="bx--table-header-label">Email</span></th>
                                                            <th><span className="bx--table-header-label">Push</span></th>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rows.map(row => (
                                                            <TableRow key={row.id}>
                                                                {row.cells.map(cell => (
                                                                    <TableCell key={cell.id}>{cell.value}</TableCell>
                                                                ))}
                                                                <td><TrashCan20 /></td>
                                                                <TableSelectRow {...getSelectionProps({ row })} />
                                                                <TableSelectRow {...getSelectionProps({ row })} />

                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        )}
                                    />

                                    <div className="customLocationtypes">
                                        <a onClick={this.customLocationClick} >
                                            {!self.customLocationFlag &&
                                                <AddAlt20 />
                                            }
                                            {self.customLocationFlag &&
                                                <Save20 />
                                            }
                                        </a>
                                        Add new notification
                                        {self.customLocationFlag &&
                                            <div className="AlertSubTypes">

                                                <div className="forMyLocationSelectGroup">
                                                    <Select
                                                        className="some-class"
                                                        defaultValue="placeholder-item"
                                                        disabled={false}
                                                        helperText=""
                                                        id="select-1"
                                                        inline={false}
                                                        invalid={false}
                                                        invalidText="A valid value is required"
                                                        labelText="Notification Name"
                                                        light={false}
                                                        onChange={function noRefCheck() { }}
                                                        size="xl"
                                                    >
                                                        <SelectItem
                                                            disabled
                                                            hidden
                                                            text="My Notification"
                                                            value="placeholder-item"
                                                        />

                                                    </Select>

                                                    <Select
                                                        className="some-class"
                                                        defaultValue="placeholder-item"
                                                        disabled={false}
                                                        helperText=""
                                                        id="select-1"
                                                        inline={false}
                                                        invalid={false}
                                                        invalidText="A valid value is required"
                                                        labelText="Notification Severity"
                                                        light={false}
                                                        onChange={function noRefCheck() { }}
                                                        size="xl"
                                                    >
                                                        <SelectItem
                                                            disabled
                                                            hidden
                                                            text="Statement"
                                                            value="placeholder-item"
                                                        />

                                                    </Select>

                                                    <Select
                                                        className="some-class"
                                                        defaultValue="placeholder-item"
                                                        disabled={false}
                                                        helperText=""
                                                        id="select-1"
                                                        inline={false}
                                                        invalid={false}
                                                        invalidText="A valid value is required"
                                                        labelText="Expiration Date"
                                                        light={false}
                                                        onChange={function noRefCheck() { }}
                                                        size="xl"
                                                    >
                                                        <SelectItem
                                                            disabled
                                                            hidden
                                                            text="mm/dd/yyyy"
                                                            value="placeholder-item"
                                                        />

                                                    </Select>
                                                </div>
                                                <div className="forOtherGroup">
                                                    <TextArea
                                                        className="some-class"
                                                        cols={30}
                                                        disabled={false}
                                                        helperText=""
                                                        id="test2"
                                                        invalid={false}
                                                        invalidText="A valid value is required"
                                                        labelText="Notification Description"
                                                        light
                                                        onChange={function noRefCheck() { }}
                                                        onClick={function noRefCheck() { }}
                                                        placeholder="Placeholder text."
                                                        rows={4}
                                                    />
                                                    <FormGroup
                                                        invalid={false}
                                                        legendText="Privacy"
                                                        message={false}
                                                        messageText=""
                                                    >
                                                        <RadioButtonGroup
                                                            defaultSelected="default-selected"
                                                            labelPosition="right"
                                                            legend="Group Legend"
                                                            name="privacyNotification"
                                                            onChange={function noRefCheck() { }}
                                                            orientation="vertical"
                                                            valueSelected="default-selected"
                                                        >
                                                            <RadioButton
                                                                className="some-class"
                                                                id="private"
                                                                labelText="Private"
                                                                value="private"
                                                            />
                                                            <RadioButton
                                                                className="some-class"
                                                                id="public"
                                                                labelText="Public"
                                                                value="public"
                                                            />
                                                            <RadioButton
                                                                className="some-class"
                                                                id="sharedwith"
                                                                labelText="Shared with:"
                                                                value="sharedwith"
                                                            />
                                                        </RadioButtonGroup>
                                                        <div className="notificationEmail">
                                                            <TextInput
                                                                className="notificationEmail"
                                                                defaultValue="Add emails separate by commas"
                                                                disabled={false}
                                                                helperText=""
                                                                id="test2"
                                                                invalid={false}
                                                                invalidText="A valid value is required"
                                                                labelText="Email"
                                                                light={false}
                                                                onChange={function noRefCheck() { }}
                                                                onClick={function noRefCheck() { }}
                                                                placeholder="Placeholder text"
                                                                size={'xl'}
                                                                type="text"
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Tab>

                        </Tabs>
                    </p>
                </Modal>
            </div>
        )
    }
}
