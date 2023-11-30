import React from 'react';

class TimeStampConvert extends React.Component {
  convertUnixTimestamp = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    const options = {
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
  };

  render() {
    const forecastedTime = this.props.forecastedTime; 
    const formattedTime = this.convertUnixTimestamp(forecastedTime);

    return (
      <div>
        <p>{formattedTime}</p>
      </div>
    );
  }
}

export default TimeStampConvert;
