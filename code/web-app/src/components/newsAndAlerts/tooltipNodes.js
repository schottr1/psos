import React from 'react';
import ThumbsDown32 from '@carbon/icons-react/lib/thumbs-down/20';
import ThumbsUp32 from '@carbon/icons-react/lib/thumbs-up/20';
import Location32 from '@carbon/icons-react/lib/location/20';
import Email32 from '@carbon/icons-react/lib/email/20';

const toolTipTestFn = () => {
  return (
    <div className="viewIcons">
      <div className="tooltipIcons">
        <ThumbsUp32 />
        <br />
        <span>Like</span>
      </div>
      <div className="tooltipIcons">
        <ThumbsDown32 />
        <br />
        <span>Dislike</span>
      </div>
      <div className="tooltipIcons">
        <Email32 />
        <br />
        <span>Email</span>
      </div>
      <div className="tooltipIcons">
        <Location32 />
        <br />
        <span>Locate</span>
      </div>
    </div>
  );
};

const toolTipNodes = () => [
  {
    align: 'end',
    direction: 'bottom',
    tooltipText: toolTipTestFn(),
    triggerClassName: 'bx--tooltip__trigger',
    children: '',
  },
];

export default toolTipNodes;
