import React from 'react';
import { PropTypes } from 'react-router';


class Home extends React.Component
{

  constructor(props) {
      super(props)
      this.state = {
        shapes: ["fa-circle-o", "fa-circle", "fa-square", "fa-square-o", "fa-diamond", "fa-plus-square", "fa-heart", "fa-arrow-up", "fa-arrow-left", "fa-arrow-down", "fa-arrow-right", "fa-caret-up"],
        colors: ["red", "yellow", "gray", "blue", "green", "black", "brown", "violet", "olive", "orange"],
        lifes: [true, true, true],
        score: 0,
        level: 1,
        time: 0,
        loaded: false
      };
  }

  componentDidMount() {

    $(".outer").height($(window).height() - 50);
    $(".rightPanel").height($(window).height() - 40);

    $(".inner").css({"top": $(".outer").outerHeight()  });

    //this.changeLevel();
    $("#landingModal").modal('show')

  }


  changeLevel() {

    var self = this;
    elementArray = [];
    taskArray = [];
    $("#landingModal").modal('hide')
    $("#levelModal").modal('hide');
    level = this.state.level;
    this.setState({lifes: [true, true, true], score: 0});
    var center = Math.floor($(".outer").outerWidth()/2);

    //to stop running animation.
    $(".inner").stop();
    $(".inner").height((self.state.level * 500) + 1000);
    $(".inner").css({"top": $(".outer").outerHeight()  });

    //alert($(".outer").outerWidth() - 300)
    var innerHtml = "", elementArray = [];
    for(var i=0; i< (self.state.level * 5) + 10; i++) {
      var shape = Math.floor(Math.random() * this.state.shapes.length);
      var color = Math.floor(Math.random() * this.state.colors.length);

      var ele = shape+"_"+color;

      // to removing repeated elements
      if(elementArray.indexOf(ele) != "-1") {
        i--;
      }
      else {
        elementArray.push(ele);
        var left =  (center * (i%2))+Math.floor(Math.random() * center);
        if(left > (center*2)-120 )
        left -= 120;
        //console.log(i+" left "+left)

        var top = 100*i;
        innerHtml += "<div class='fa "+ this.state.shapes[shape] +" clickableElement' id='"+ele+"' aria-hidden='true' style='font-size: 80px; color: "+ this.state.colors[color] +"; top: "+top+"px; left: "+left+"px; position: absolute' ></div>";
      }
    }

    console.log("elementArray: "+elementArray);
    $("#scrollingDiv").html(innerHtml);
    this.changeTasks(elementArray)

  }

  changeTasks(elementArray) {

    // selecting tasks randomly
    var chooser = this.randomNoRepeats(elementArray);
    for( var i=0; i<5; i++) {
      var task = [];
      task.push(chooser());
      task.push(chooser());
      taskArray.push(task);
    }

    console.log("taskArray: "+taskArray);
    console.log("taskArray: "+taskArray[1][0]);

    var innerHtml = "";
    taskArray.map((task, key) => {
      var ary = task[0].split('_');
      innerHtml += "<div class='fa "+ this.state.shapes[ary[0]] +" clickableElement' id='"+task[0]+"_task"+"' aria-hidden='true' style='font-size: 50px; color: "+ this.state.colors[ary[1]] +"; ' ></div> <br/>";

      var ary = task[1].split('_');
      innerHtml += "<div class='fa "+ this.state.shapes[ary[0]] +" clickableElement' id='"+task[1]+"_task"+"' aria-hidden='true' style='font-size: 50px; color: "+ this.state.colors[ary[1]] +"; ' ></div> <br/>";

      innerHtml += "<div style='width: 100%; height: 2px; background-color: lightgray; margin: 10px 0px'></div>";
    })

    $(".rightPanel").html(innerHtml);

    this.addEvent();

  }

  addEvent() {
    var firstElement = -1, self = this;
    $(".clickableElement").mousedown(function(){
      if($(this).hasClass("clickableElement")) {
        var id = $(this).attr('id');

        if(firstElement == -1) {
          taskArray.map((task, key) => {
            if(task[0] == id || task[1] == id) {
              firstElement = key;
            }
          })

          if(firstElement != -1) {
            $(this).addClass("activeElement");
            $(this).removeClass("clickableElement");
            //	$("#"+id+"_task").addClass("clickedElement");
          }
          else {
            $(".activeElement").addClass("clickableElement");
            $(".activeElement").removeClass("activeElement");

            var lifeCount = 0, lifes = self.state.lifes;
            self.state.lifes.map((life, key) => {
              if(life)
                lifeCount++;
            })
            if(lifeCount == 1) {
              $("#levelModal").modal('show');
            }

            lifes[lifeCount-1] = false;
            self.setState({lifes: lifes})
          }
        }
        else {
          if(taskArray[firstElement][0] == id || taskArray[firstElement][1] == id) {

            $("#"+taskArray[firstElement][0]).addClass("clickedElement");
            $("#"+taskArray[firstElement][0]).removeClass("clickableElement");
            $("#"+taskArray[firstElement][0]+"_task").addClass("clickedElement");

            $("#"+taskArray[firstElement][1]).addClass("clickedElement");
            $("#"+taskArray[firstElement][1]).removeClass("clickableElement");
            $("#"+taskArray[firstElement][1]+"_task").addClass("clickedElement");


            $(".activeElement").removeClass("activeElement");
            if(self.state.score == 8) {
              $("#levelModal").modal('show');
            }
            self.setState({score: self.state.score + 2});
            firstElement = -1;
          }
          else {
            firstElement = -1;
            var lifeCount = 0, lifes = self.state.lifes;
            self.state.lifes.map((life, key) => {
              if(life)
                lifeCount++;
            })
            if(lifeCount == 1) {
              $("#levelModal").modal('show');
            }

            lifes[lifeCount-1] = false;
            self.setState({lifes: lifes})

            $(".activeElement").addClass("clickableElement");
            $(".activeElement").removeClass("activeElement");
          }
        }
      }
    });

    //if(!self.state.loaded) {
      //self.setState({loaded: true})
      setTimeout(function(){
        autoScroll();
      }, 300);
    //}
    time = 65 - (self.state.level * 5);
    self.setState({time: time});
    //self.timeCountDown();
  }

  randomNoRepeats(array) {
    var copy = array.slice(0);
    return function() {
      if (copy.length < 1) { copy = array.slice(0); }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
    };
  }


  timeCountDown() {

    var self = this;
    setInterval(function(){
      if(self.state.time > 0) {
        time = --self.state.time;
        self.setState({time: time});
      }
      else {
      //  clearInterval(refreshInterval);
        $("#levelModal").modal('show');
        // self.setState({level: ++self.state.level},() => {
        //   self.changeLevel();
        // });
      }
    }, 1000);
  }

  nextLevel() {
    this.setState({level: ++this.state.level},() => {
      this.changeLevel();
    });
  }

  restartLevel() {
    this.changeLevel();
  }

  startGame() {
    this.setState({level: 1},() => {
      this.changeLevel();
    });
  }

  gameInitialStarting() {
    this.setState({level: 1},() => {
      this.changeLevel();
      this.timeCountDown();
    });
  }


  render() {
    return (
      <div className="container-fluid">



      <div className="modal fade" id="landingModal" data-backdrop="static" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-body">
              <center>
                <span className="modalTitle">Shapes&Shapes</span>
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
                    <i className="fa fa-power-off modalButton" onClick={this.gameInitialStarting.bind(this)} aria-hidden="true"></i>
                    <h3>Start</h3>
                  </div>
                </div>
              </center>
            </div>
          </div>

        </div>
      </div>



        <div className="modal fade" id="levelModal" data-backdrop="static" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-body">
                <center>
                  <span className="modalTitle">Level {this.state.level}</span>
                  <div className="row" style={{marginTop: "40px", marginBottom: "10px"}}>
                    {
                      (this.state.score >= 6)?
                      (
                        (this.state.level == 5)?(
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
                      <i className="fa fa-refresh modalButton" onClick={this.restartLevel.bind(this)} aria-hidden="true"></i>
                      <h3>Replay</h3>
                    </div>
                    {(this.state.score >= 6 && this.state.level != 5)?
                      (
                        <div className="col-md-6 modalOptions">
                          <i className="fa fa-arrow-right modalButton" onClick={this.nextLevel.bind(this)} aria-hidden="true"></i>
                          <h3>Next</h3>
                        </div>
                      ):
                      (
                        <div className="col-md-6">
                          <i className="fa fa-power-off modalButton" onClick={this.startGame.bind(this)} aria-hidden="true"></i>
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



        <div className="row" id="scoreCard" style={{backgroundColor: 'black', color: 'white', height: 30, fontSize: 20}}>
          <div className="col-md-6 col-sm-6 col-xs-12" style={{backgroundColor: 'black'}}>
            <span>LEVEL {this.state.level}</span>
            <span style={{marginLeft: "50px"}}>
              {
                this.state.lifes.map((life, key) => {
                  return <span key={key}>
                    {
                      (life)?
                      (<span className="fa fa-heart activeLife" aria-hidden='true'></span>):
                      (<span className="fa fa-heart inActiveLife" aria-hidden='true'></span>)
                    }
                  </span>
                })
              }
            </span>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12" style={{backgroundColor: 'black'}}>
            <span className="pull-right">SCORE {this.state.score}</span>
            <span className="pull-right" style={{marginRight: "50px"}}>Time: {this.state.time}</span>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-2 hidden-sm hidden-xs" />
            <div className="col-md-6 col-sm-9 col-xs-9">
              <div className="outer form-control" style={{border: '1px solid red', height: 500, overflow: 'hidden'}}>
                <div id="scrollingDiv" className="inner form-control" style={{border: '3px solid #ccc', height: 1000, position: 'relative'}}>
                </div>
              </div>
            </div>
            <div className="col-md-2 rightPanel col-sm-3 col-xs-3" style={{border: '1px solid blue', textAlign: 'center', overflowX: 'hidden'}}>
              <div className="col-md-2 hidden-sm hidden-xs" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Home.contextTypes = { history: PropTypes.history }
export default Home;
