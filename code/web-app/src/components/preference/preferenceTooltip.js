
import React from 'react';
import { Slider } from 'carbon-components-react';
import './preferenceModal.scss';

const toolTipTestFn = () => {
    return (
        <div className="viewSlider">
            <Slider
                ariaLabelInput="Transparency"
                disabled={false}
                hideTextInput={true}
                id="slider"
                inputType="number"
                labelText="Transparency"
                light={false}
                max={100}
                maxLabel=""
                min={0}
                minLabel=""
                name=""
                onChange={function noRefCheck() { }}
                onRelease={function noRefCheck() { }}
                step={1}
                stepMultiplier={5}
                value={25}
            >

            </Slider>
        </div>
    );
};

const toolTipNodesForPref = () => [
    {
        align: 'start',
        direction: 'bottom',
        tooltipText: toolTipTestFn(),
        triggerClassName: 'bx--tooltip__trigger',
        children: '',
    },
];

export default toolTipNodesForPref;
