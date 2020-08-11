import React, { Component } from 'react';
import Dashboard from '../../components/Dashboard';

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
        <Dashboard />
      </>
    );
  }
}

export default DashboardPage;
