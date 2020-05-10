import React, { Component } from 'react';
import Data from '../data.json';
import Grid from '@material-ui/core/Grid';
import Card from './Card';

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        message: false,
      }
    }


    componentDidMount() {
        this.setState({ data: Data });
        const API= `http://localhost:8080/api/data`;
        return fetch(API, { method: 'GET' })
        .then(res => res.json())
        .then((result) => this.setState({ message: true }))
        .catch((err) => this.setState({ message: false }));
    }



    render() { 
        const { data } = this.state;
        return (  
            <div >
                <div className="home-description">
                    <h1> welcome to my portfolio </h1>
                </div>
                <div className="grid">
                    <Grid container spacing={5} style={{ width: "100vw"}}> 
                        {data.map(function(card, index) {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={`item=${index}`}>
                                    <Card projectName={card.projectName} description={card.description} image={card.image} demoUrl={card.demoUrl} githubUrl={card.githubUrl} key={index} />           
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </div>
        );
    }
}
 
export default Home;