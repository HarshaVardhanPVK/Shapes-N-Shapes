import React from 'react';

class Main extends React.Component
{
  componentWillMount() {
  }

  render()
  {
    return  <div className="main-container">

      <div className="container-fluid" style={{padding:"0px"}}>
        {this.props.children}
      </div>
    </div>
  }
}
export default Main;
