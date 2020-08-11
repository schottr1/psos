import React, { Component } from 'react';
import Shell from '../../components/Shell';

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsDetails: [], 
      preferences: [
        { layer_preferences: {} },
        {
          news_preferences: {
            time: ['From:To'],
          },
        },
        {
          alerts_preferences: {
            time: ['From:To'],
          },
        },
      ],
    };
  }
  render() {
    return (
      <>
        <Shell />
      </>
    );
  }
}

export default DashboardPage;
