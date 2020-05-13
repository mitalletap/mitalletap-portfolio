import React, { Component } from 'react';
import Image from '../images/ImageNotFound.png';
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
        image: null
      }
    }

    componentDidMount() {
        this.checkImagePermissions(this.props.image);
    }
    


    checkImagePermissions = (i) => {
        fetch(i)
        .then((res) => {
            if(res.status !== 200) {
                this.setState({ image: 'https://s3.us-east-2.amazonaws.com/mitalletap.io/mitalletap.io_default_imagenotfound.png'});
            } else {
                this.setState({ image: null });
            }
        })
    }


    render() { 
        return (  
            <div style={{ paddingLeft: "20px"}}>
                <Card raised={true}>
                    <CardActionArea> 
                        <CardMedia style={{height: "300px"}} image={this.state.image === null ? this.props.image : this.state.image} title="Contemplative Reptile" />
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