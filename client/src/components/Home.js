import React, { Component } from 'react';
import Data from '../data.json';
import Grid from '@material-ui/core/Grid';
import Card from './Card';
import HelperFunctions from '../helpers/helper';

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        envState: ''
      }
    }


    componentDidMount() {
        var envVar = HelperFunctions.getEnvironmentStatus();
        this.setState({ envState: envVar })
        const API= `http://${envVar}/project/all`;
        return fetch(API, { method: 'GET' })
        .then(res => res.json())
        .then((result) => this.setState({ data: result }))
        .catch((err) => this.setState({ data: [] }));
    }



    render() { 
        const { data } = this.state;
        return (  
            <div>
                <div className="grid">
                    <Grid className="home-title-grid">
                        <Grid item xl={12}>
                            <div className="home-description">
                                <h1> welcome to my portfolio </h1>
                            </div>      
                        </Grid>
                    </Grid>
                    <Grid container spacing={5} style={{ width: "100vw" }}> 
                        {data.map(function(card, index) {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={`item=${index}`}>
                                    <Card projectName={card.project_name} description={card.description} image={card.image_url} demoUrl={card.demo_url} githubUrl={card.github_url} key={index} />           
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