import React from 'react';
import { PropTypes } from 'react-router';

class SignUpModal extends React.Component {

  constructor(props) {
      super(props)
      this.state = {

      };
  }

  render() {

    return(
      <div className="modal fade" id="landingModal" data-backdrop="static" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-body">
              <center>
                <span className="modalTitle">Shapes-N-Shapes</span>
                <div className="row" style={{marginTop: "40px", marginBottom: "10px", textAlign: "left", fontSize: "15px"}}>
                  <ul>
                    <li>In this Game we will have 5 combinations in each Level.</li>
                    <li>To complete a Level we have to clear min 2 Combinations.</li>
                    <li>Time limit will be decreased Level to Level.</li>
                    <li>Number of Shapes and speed of flowing(left) view will increases level by level to make game tough.</li>
                    <li>Each Level have 3 lifes and will be decreased by 1 while clicking on wrong combination.</li>
                    <li>This Game contains max of 5 Levels.</li>
                  </ul>
                </div>
                <div className="row" style={{marginTop: "40px", marginBottom: "10px"}}>
                  <span className="modalText">Happy Gaming</span>
                </div>
                <div className="row" style={{marginTop: "40px", marginBottom: "10px"}}>
                  <div className="col-md-12">
                    <i className="fa fa-power-off modalButton" onClick={this.props.gameInitialStarting.bind(this)} aria-hidden="true"></i>
                    <h3>Start</h3>
                  </div>
                </div>
              </center>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

SignUpModal.contextTypes = { history: PropTypes.history }
export default SignUpModal;
