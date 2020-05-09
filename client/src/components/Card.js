import React, { Component } from 'react';
import Image from '../images/ahsoka.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



class CustomCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
  
      }
    }
    render() { 
        return (  
            <div style={{ paddingLeft: "20px"}}>
                <Card>
                    <CardActionArea > 
                        <CardMedia style={{height: "300px"}} image={this.props.image} title="Contemplative Reptile" />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.projectName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.props.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" href={this.props.githubUrl}> Github </Button>
                        <Button size="small" color="primary" href={this.props.demoUrl}> Demo </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
 
export default CustomCard;