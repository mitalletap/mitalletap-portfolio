import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dropzone from "react-dropzone";
import '../App.css';

class Admin extends Component {
    constructor(props) {
      super(props);
      this.state = {
        projectName: '',
        githubUrl: '',
        demoUrl: '',
        image: '',
        description: '',
        clicked: false
      }
    }
    render() { 
        return (  
            <div className="admin-page">
                <h1> Admin Page </h1>
                <div className="admin-grid">
                    <Grid container spacing={4}> 
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" size="small" label="Project Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" size="small" label="Github URL" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" size="small" label="Demo URL" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" size="small" label="Description" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            {/* <Dropzone>
                                <p> Try dropping some files here, or click to select files to upload. </p>
                            </Dropzone> */}
                        </Grid>
                        <Grid item xs={12}>
                        <button className="submit-button" onClick={() => this.setState({ clicked: true })}>
                            Click me
                        </button>
                        </Grid>
                    </Grid>
                </div>
                
            </div>
        );
    }
}
 
export default Admin;