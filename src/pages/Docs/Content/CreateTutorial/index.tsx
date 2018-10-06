import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Form, Field } from "react-final-form";
import "./CreateTutorial.css";

import { storage } from "../../../../utils/firebase";
// The ts linter error from FileUploader import is ignored by utils/react-firebase-file-uploader.d.ts
import FileUploader from "react-firebase-file-uploader";

export interface IState {
  stepNb: number;
  cost: number;
  cover_picture_url: string;
  description: string;
  difficulty_level: string;
  id: string;
  slug: string;
  steps: [];
  stepsImgUrl: [];
  time: number;
  title: string;
  workspace_name: string;
  isUploading: boolean;
  imgUploadProgress: number;
  coverImgUrl: string;
  coverImgFilename: string;
  uploadPath: string;
}

const required = (value: any) => (value ? undefined : "Required");

class CreateTutorial extends React.PureComponent<
  RouteComponentProps<any>,
  IState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      stepNb: 3,
      cost: 0,
      cover_picture_url: "",
      description: "",
      difficulty_level: "easy",
      id: "",
      slug: "",
      steps: [],
      stepsImgUrl: [],
      time: 0,
      title: "",
      workspace_name: "",
      isUploading: false,
      imgUploadProgress: 0,
      coverImgUrl: "",
      coverImgFilename: "",
      uploadPath: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.preparePayload = this.preparePayload.bind(this);
  }

  public addStep = () => {
    this.setState({
      stepNb: this.state.stepNb + 1
    });
  };

  public sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

  public preparePayload = (values: any) => {
    console.log("values", values);
    // console.log("values length", Object.keys(values).length);
    // console.log("preparePayload");
    // const valuesArray = Object.keys(values).map(key => {
    //   return [String(key), values[key]];
    // });
    // console.log("valuesArray : ", valuesArray);
    // const payload: any = [];
    // const allSteps: any = [];
    // valuesArray.map((value: any, index: any) => {
    //   console.log("value : ", value);
    //   // const stepIndex: any = "step_" + (index + 1);
    //   console.log("valuesArray[index] :", valuesArray[index]);
    //   // for (let j = 0; j <= valuesArray.length; j++) {
    //   if (value.includes(valuesArray[index])) {
    //     console.log("inside if");
    //     allSteps.push(value);
    //   } else {
    //     console.log("inside else");
    //     payload.push(value);
    //   }
    //   // }
    // });
    // payload.push(allSteps);
    // console.log("payload : ", payload);
  };
  public onSubmit = (values: any) => {
    this.preparePayload(values);
    // await this.sleep(300);
    // window.alert(JSON.stringify(values));
  };

  public handleUploadStart = () => {
    this.setState({ isUploading: true, imgUploadProgress: 0 });
  };
  public handleProgress = (imgUploadProgress: any) => {
    this.setState({ imgUploadProgress });
  };
  public handleUploadError = (error: any) => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  public handleUploadCoverSuccess = (filename: any) => {
    this.setState({
      imgUploadProgress: 100,
      coverImgFilename: filename,
      isUploading: false
    });
    storage
      .ref(this.state.uploadPath)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({ coverImgUrl: url });
      });
  };
  public handleUploadStepImgSuccess = (filename: any) => {
    this.setState({
      imgUploadProgress: 100,
      isUploading: false
    });
    storage
      .ref(this.state.uploadPath)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        // const stepImgArray: any = this.state.stepsImgUrl[this.state.stepsImgUrl.length - 1]
        this.setState({ coverImgUrl: url });
      });
  };

  public onChangeHandlerStepImg = (event: any) => {
    const {
      target: { files }
    } = event;
    const filesToStore: any = [];
    console.log("files :", files);
    for (const f of files) {
      console.log("f :", f);
      filesToStore.push(f);
    }
    this.setState({ stepsImgUrl: filesToStore });
  };

  public onTitleChange = (event: any) => {
    // TODO the event.target.value needs to be formated as the article slug
    this.setState({ uploadPath: "uploads/" + event.target.value });
  };

  public displayStepImgUpload = (stepIndex: any) => {
    return (
      <FileUploader
        accept="image/*"
        name={"step" + stepIndex + "_image"}
        storageRef={storage.ref(this.state.uploadPath)}
        onUploadStart={this.handleUploadStart}
        onUploadError={this.handleUploadError}
        onUploadSuccess={this.handleUploadStepImgSuccess}
        onProgress={this.handleProgress}
      />
    );
  };

  public render() {
    const steps: any = [];
    for (let i = 1; i <= this.state.stepNb; i++) {
      steps.push(i);
    }
    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit, pristine, values, invalid }) => (
          <form className="tutorial-form" onSubmit={handleSubmit}>
            <h2>Create tutorial</h2>
            <Field
              name="workspace_name"
              validate={required}
              placeholder="Workspace Name"
            >
              {({ input, meta }) => (
                <div>
                  <label>Workspace name</label>
                  <input {...input} type="text" placeholder="Last Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="tutorial_title" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>Tutorial title</label>
                  <input
                    {...input}
                    type="text"
                    onBlur={this.onTitleChange}
                    placeholder="Tutorial title"
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <label>Tutorial cover:</label>
            {this.state.isUploading && (
              <p>Progress: {this.state.imgUploadProgress}</p>
            )}
            {this.state.coverImgUrl && (
              <img
                className="cover-img"
                src={this.state.coverImgUrl}
                alt={"cover image - " + this.state.title}
              />
            )}
            <FileUploader
              accept="image/png, image/jpeg"
              name="coverImg"
              storageRef={storage.ref(this.state.uploadPath)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadCoverSuccess}
              onProgress={this.handleProgress}
            />
            <Field
              name="tutorial_description"
              validate={required}
              placeholder="Quick tutorial description"
            >
              {({ input, meta }) => (
                <div>
                  <label>Tutorial description</label>
                  <input
                    {...input}
                    type="text"
                    placeholder="Tutorial description"
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <div>
              <label>Difficulty</label>
              <Field name="difficulty" component="select">
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="difficult">difficult</option>
              </Field>
            </div>
            <Field name="tutorial_time" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>Time</label>
                  <input {...input} type="text" placeholder="Time needed" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="cost" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>Cost</label>
                  <input {...input} type="text" placeholder="The cost ? in $" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <p>File(s)</p>
            <FileUploader
              multiple={true}
              name="files"
              storageRef={storage.ref(this.state.uploadPath)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadCoverSuccess}
              onProgress={this.handleProgress}
            />

            <div>
              {steps.map((step: any, index: any) => {
                const stepIndex: any = index + 1;
                return (
                  <div key={index}>
                    <h3>Step {stepIndex}</h3>
                    <Field
                      name={"step_" + stepIndex + "_title"}
                      validate={required}
                    >
                      {({ input, meta }) => (
                        <div>
                          <label>Title : </label>
                          <input
                            {...input}
                            type="text"
                            placeholder="Step title"
                          />
                          {meta.error &&
                            meta.touched && <span>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                    <Field
                      name={"step_" + stepIndex + "_text"}
                      validate={required}
                    >
                      {({ input, meta }) => (
                        <div>
                          <label>Content : </label>
                          <input
                            {...input}
                            type="text"
                            placeholder="Step content"
                          />
                          {meta.error &&
                            meta.touched && <span>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                    <p>Upload picture(s) about this particular step</p>
                    {this.displayStepImgUpload(stepIndex)}
                  </div>
                );
              })}
            </div>
            <button onClick={this.addStep}>ADD STEP</button>
            <button type="submit" disabled={pristine || invalid}>
              Submit
            </button>
          </form>
        )}
      />
    );
  }
}

export default CreateTutorial;
