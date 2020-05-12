import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import S3 from 'react-aws-s3';

import '../App.css';

class Admin extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fileName: '',
        fileType: '',
        fileData: [],
        projectName: '',
        githubUrl: '',
        demoUrl: '',
        image: '',
        description: '',
        clicked: false,
        completed: false,
        status: "",
        open: false
      }


    }

    componentDidMount()
 {
     
 }
    allFieldsComplete() {
        const { fileName, projectName, githubUrl, demoUrl, description, fileData } = this.state;
        return (githubUrl !== "" && projectName !== '' && demoUrl !== '' && description !== '' && fileData.size > 0);
    }

    handleProjectName = e => {
        this.setState({ projectName: e.target.value })
    } 
    
    handleFileName = e => {
        this.setState({ fileName: e.target.value })
    }

    handleGithub = e => {
        this.setState({ githubUrl: e.target.value })
        
    }

    handleDemo = e => {
        this.setState({ demoUrl: e.target.value })
        
    }

    handleDescription = e => {
        this.setState({ description: e.target.value })

    }

    handleFileSelected = e => {
        this.setState({ image: e.target.files[0].name, fileData: e.target.files[0] });
    }


    handleSubmit = () => {
        const { fileData, fileName } = this.state;
        const config = {
            bucketName: process.env.REACT_APP_BUCKET_NAME,
            region: process.env.REACT_APP_BUCKET_REGION,
            accessKeyId: process.env.REACT_APP_S3_KEY,
            secretAccessKey: process.env.REACT_APP_S3_SECRET,
            s3Url: `https://s3.${process.env.REACT_APP_BUCKET_REGION}.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}`
        }

        const Client = new S3(config);
        Client.uploadFile(fileData, fileName)
        .then((res) => this.setState({ status: "true", open: true }))
        .catch((err) => this.setState({ status: "false", open: true }));

        this.setState({ clicked: true, completed: true });
    }

    handleClose = () => {
        this.setState({
          ...this.state,
          open: false,
        });
      };

    render() { 
        const { image, projectNam, completed, open } = this.state;
        const horizontal = "center";
        const vertical = "top";
        return (  
            <div className="admin-page">
                <Snackbar open={open} autoHideDuration={1000} onClose={this.handleClose} anchorOrigin={{ vertical, horizontal }}>
                    {
                        this.state.status === "true" ?
                        <Alert severity="success">
                            Successfully saved Project!
                        </Alert> 
                        :
                        <Alert severity="error">
                            Failed to save Project!
                        </Alert>
                    }
                </Snackbar>
                <h1> Admin Page </h1>
                <div className="admin-grid">
                    <Grid container spacing={4}> 
                        <Grid item xs={12}>
                            <TextField id="user-program" size="small" label="Project Name" variant="outlined" onChange={this.handleProjectName}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="user-file" size="small" label="File Name" variant="outlined" onChange={this.handleFileName}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="user-github" size="small" label="Github URL" variant="outlined" onChange={this.handleGithub}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="user-demo" size="small" label="Demo URL" variant="outlined" onChange={this.handleDemo}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="user-description" size="small" label="Description" variant="outlined" onChange={this.handleDescription}/>
                        </Grid>
                        <Grid item xs={12}>
                            <input accept="image/*" id="icon-button-file" type="file" onChange={this.handleFileSelected}/>
                            <label htmlFor="icon-button-file">
                                <Button variant="contained" color="primary" component="span"> Upload Image </Button>
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="standard-multiline-static" InputProps={{ readOnly: true }} placeholder={image} rows={4} />
                        </Grid>
                        <Grid item xs={12}>
                                <Button disabled={!this.allFieldsComplete()} className="submit-button" variant="contained" color="primary" component="span" onClick={this.handleSubmit}> Submit Information </Button>
                        </Grid>
                    </Grid>
                </div>
            <button onClick={() => console.log(this.state)}> state </button>
            </div>
        );
    }
}
 
export default Admin;