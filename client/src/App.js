import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Data from './data.json';
import Grid from '@material-ui/core/Grid';
import Card from './components/Card';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }


  componentDidMount() {
    this.setState({ data: Data });
  }


  render() { 
    const { data } = this.state;
    return (  
      <div className="App">
        <h1> Welcome to my Portfolio </h1>
        {/*  position: 'absolute', transform: 'translate(50)' */}
        <Grid container spacing={5} style={{ width: "100vw"}}> 
          {data.map(function(card, index) {
            console.log(card);
            return (
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Card projectName={card.projectName} description={card.description} image={card.image} demoUrl={card.demoUrl} githubUrl={card.githubUrl} key={index} />           
              </Grid>
            )
          })}
        </Grid>
      </div>
    );
  }
}
 
export default App;
