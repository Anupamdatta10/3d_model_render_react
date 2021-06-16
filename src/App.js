import React, { Component } from 'react';
import "./App.css";
import CustomizedDialogs from './modals.js' 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      data:[],
      url: "",
    }
    this.handleInputValue = this.handleInputValue.bind(this);
    this.apicall = this.apicall.bind(this);
  }
 
  // handle input value coming from the child component
  handleInputValue(val) {
    this.setState({ inputVal: val },()=>{
    this.apicall()
    });
    
  }
  showdata = (e) => {
    var { data } = this.state;
    console.log(e.target.value);
    if(e.target.value!=="")
    this.setState({ url: data[e.target.value].embedUrl });
    else
    this.setState({ url:"" });
  };
  apicall() {
    let { inputVal } = this.state;
   
    if(inputVal!==""){
    fetch("https://api.sketchfab.com/v3/search?q=" + inputVal)
      .then((res) => res.json())
      .then((json) => {
       
        this.setState({
          data: json.results.models
        });
      });
    }
  }
 
  render() {
    var { data } = this.state;
    var i = 0;
    return (
      <div>
        <CustomizedDialogs handleInput={this.handleInputValue} />
     
      <select onChange={this.showdata}>
        <option value="">select one</option>
          {data.map((item) => (
            <option value={i} key={i++}  >
              {item.name}
        </option>
          ))}
        </select>
        <div className="responsive-iframe">
        <iframe
           
           title="frame"
           src={this.state.url}
           className="responsive-iframe"
           id="api-frame"
           allow="autoplay; fullscreen; vr"
           allowvr
           allowFullScreen
           mozallowfullscreen="true"
           webkitallowfullscreen="true"
         ></iframe></div>
      </div >
    );
  }
}
 
export default App;