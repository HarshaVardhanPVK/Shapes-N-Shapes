import React from 'react';
import { PropTypes } from 'react-router';

class LevelModal extends React.Component {

  constructor(props) {
      super(props)
      this.state = { };
  }

  render() {

    return(
      <div className="modal fade" id="levelModal" data-backdrop="static" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-body">
              <center>
                <span className="modalTitle">Level {this.props.level}</span>
                <div className="row" style={{marginTop: "40px", marginBottom: "10px"}}>
                  {
                    (this.props.score >= 6)?
                    (
                      (this.props.level == 5)?(
                          <span className="modalText">Game Finished</span>
                      ):(
                        <span className="modalText">Level Cleared</span>
                      )
                    ):(
                      <span className="modalText">Level Failed</span>
                    )
                  }
                </div>
                <div className="row" style={{marginTop: "40px", marginBottom: "10px"}}>
                  <div className="col-md-6">
                    <i className="fa fa-refresh modalButton" onClick={this.props.restartLevel.bind(this)} aria-hidden="true"></i>
                    <h3>Replay</h3>
                  </div>
                  {(this.props.score >= 6 && this.props.level != 5)?
                    (
                      <div className="col-md-6 modalOptions">
                        <i className="fa fa-arrow-right modalButton" onClick={this.props.nextLevel.bind(this)} aria-hidden="true"></i>
                        <h3>Next</h3>
                      </div>
                    ):
                    (
                      <div className="col-md-6">
                        <i className="fa fa-power-off modalButton" onClick={this.props.startGame.bind(this)} aria-hidden="true"></i>
                        <h3>Start</h3>
                      </div>
                    )
                  }

                </div>
              </center>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

LevelModal.contextTypes = { history: PropTypes.history }
export default LevelModal;
