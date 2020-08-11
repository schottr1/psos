import React from 'react';
// import Information16 from "@carbon/icons-react/lib/information/16";
import { TooltipDefinition } from 'carbon-components-react';
import OverflowMenuVertical16 from '@carbon/icons-react/lib/overflow-menu--vertical/16';
import toolTipNodes from './tooltipNodes';

const newsList = ({ props }) => {
  return (
    <div className="newsFeed">
      <div className="newsDate" style={{ color: '#9597a0', fontSize: '10px' }}>
        {props.publishedAt}
        <TooltipDefinition {...toolTipNodes()[0]}>
        <OverflowMenuVertical16 />
    </TooltipDefinition>
      </div>
      <div className="tilteForNews">
        <a href={props.url} style={{ textDecoration: 'none' }}>
          {props.title}
        </a>
      </div>
      <div className="descWrapper">
        <div className="newsDesc">{props.text}</div>
      </div>
    </div>
  );
};

export default newsList;
