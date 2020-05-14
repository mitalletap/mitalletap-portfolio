import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import S3 from 'react-aws-s3';
import CircularProgress from '@material-ui/core/CircularProgress';
import HelperFunctions from '../helpers/helper';

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
        open: false,
        image_url: '',
        loaded: true,
        envState: ''
      }
    }

    componentDidMount() {
        var envVar = HelperFunctions.getEnvironmentStatus();
        this.setState({ envState: envVar })
    }


    allFieldsComplete() {
        const { fileName, projectName, githubUrl, demoUrl, description, fileData, fileType } = this.state;
        return (githubUrl !== "" && fileName !== "" && projectName !== '' && demoUrl !== '' && description !== '' && fileType !== '');
    }

    handleProjectName = e => {
        this.setState({ projectName: e.target.value })
    } 
    
    handleFileName = e => {
        var value = e.target.value;
        value = value.replace(/\s+/g,"+");
        this.setState({ fileName: e.target.value, image: value })
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
        var params = String(e.target.files[0].type);
        var pos = params.indexOf('/');
        var type = params.substring(pos + 1);
        this.setState({ fileData: e.target.files[0], fileType: type });
    }


    handleSubmit = () => {
        const { fileData, fileName, fileType, image } = this.state;
        this.setState({ loaded: false });
        const config = {
            bucketName: process.env.REACT_APP_BUCKET_NAME,
            region: process.env.REACT_APP_BUCKET_REGION,
            accessKeyId: process.env.REACT_APP_S3_KEY,
            secretAccessKey: process.env.REACT_APP_S3_SECRET,
            s3Url: `https://s3.${process.env.REACT_APP_BUCKET_REGION}.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}`
        }

        const publicURL = config.s3Url +`/${image}.${fileType}`;
        this.setState({ image_url: publicURL });
        const Client = new S3(config);
        Client.uploadFile(fileData, fileName)
        .then((res) => this.setState({ status: "true", open: true}, this.handleSaveToDatabase))
        .catch((err) => this.setState({ status: "falseS3", open: true, loading: false }));
        this.setState({ clicked: true, completed: true });
    }


    handleSaveToDatabase = () => { 
        const { projectName, fileName, githubUrl, demoUrl, description, image_url, progress, envState } = this.state;
        const data = {
            "project_name": projectName,
            "file_name": fileName,
            "github_url": githubUrl,
            "demo_url": demoUrl,
            "description": description,
            "image_url": image_url,
        }
        const API= `http://${envState}/project/`;
        fetch(API, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(this.setState({ loaded: true }))
        .catch((err) => this.setState({ status: "falseDB", open: true, loaded: false }));
    }

    handleClose = () => {
        this.setState({
          ...this.state,
          open: false,
        });
    };

    render() { 
        const { image, projectNam, completed, open, loaded, envState } = this.state;
        const horizontal = "center";
        const vertical = "top";
        return (  
            <div className="admin-page">
                <Snackbar open={open} autoHideDuration={5000} onClose={this.handleClose} anchorOrigin={{ vertical, horizontal }} style={{ width: "100px" }}>
                    {
                        this.state.status === "true" ?
                        <Alert severity="success">
                            Successfully saved Project!
                        </Alert> 
                        : this.state.status === "falseDB" ?
                        <Alert severity="error">
                            Failed to save project to the Database!
                        </Alert>
                        :
                        <Alert severity="error">
                            Failed to upload image to S3 and projct to the Database!
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
                            <input style={{ display: "none" }} accept="image/*" id="icon-button-file" type="file" onChange={this.handleFileSelected}/>
                            <label htmlFor="icon-button-file">
                                <Button variant="contained" color="primary" component="span"> Upload Image </Button>
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="standard-multiline-static" InputProps={{ readOnly: true }} placeholder={image} rows={4} />
                        </Grid>
                        <Grid item xs={12}>
                                <Button disabled={!this.allFieldsComplete() || loaded === false} className="submit-button" variant="contained" color="primary" component="span" onClick={this.handleSubmit}> Submit Information {loaded === false && <CircularProgress size={24} style={{ position: "absolute" }}/>} </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
 
export default Admin;