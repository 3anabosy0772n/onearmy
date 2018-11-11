import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Form, Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'
import './CreateTutorial.scss'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import {
  ITutorial,
  ITutorialFormInput,
} from '../../../../models/tutorial.models'

import DeleteIcon from '../../../../assets/icons/bin.svg'
import AddIcon from '../../../../assets/icons/add.svg'
import SaveIcon from '../../../../assets/icons/save.svg'

import { db } from '../../../../utils/firebase'

import { TUTORIAL_TEMPLATE_DATA } from './TutorialTemplate'
import { ITag } from 'src/models/models'
import { TAGS_MOCK } from 'src/mocks/tags.mock'
import {
  FirebaseFileUploader,
  IFirebaseUploadInfo,
} from 'src/pages/common/FirebaseFileUploader/FirebaseFileUploader'

export interface IState {
  formValues: ITutorialFormInput
  _uploadImgPath: string
  _uploadFilesPath: string
  _currentStepIndex: number
  _toDocsList: boolean
}

// For now tags are raw in this variable, next we'll need to get them from our server
const tags: ITag[] = TAGS_MOCK
let selectedTags: any = []
const required = (value: any) => (value ? undefined : 'Required')

export class CreateTutorial extends React.PureComponent<
  RouteComponentProps<any>,
  IState
> {
  constructor(props: any) {
    super(props)
    this.state = {
      formValues: TUTORIAL_TEMPLATE_DATA,
      _uploadImgPath: 'uploads/test',
      _uploadFilesPath: 'uploads/test',
      _currentStepIndex: 0,
      _toDocsList: false,
    }
  }

  public onSubmit = async (formValues: ITutorialFormInput) => {
    console.log('on submit', formValues)
    if (this.state.formValues.cover_image_url === '') {
      alert('Please provide a cover image before saving your tutorial')
    } else {
      const timestamp = new Date()
      // convert data to correct types and populate metadata
      const values: ITutorial = {
        ...this.castFormValuesToCorrectTypes(formValues),
        _created: timestamp,
        _modified: timestamp,
      }
      console.log('submitting', values)
      try {
        await db.collection('documentation').add(values)
        console.log('doc set successfully')
        this.props.history.push('/docs/list')
      } catch (error) {
        console.log('error while saving the tutorial')
      }
    }
  }

  // By default all tutorial form input fields come as strings. We want to cast to the
  // correct data types if this ever becomes more complex could use
  // https://medium.freecodecamp.org/how-to-write-powerful-schemas-in-javascript-490da6233d37
  public castFormValuesToCorrectTypes(values: ITutorialFormInput) {
    const formattedValues = {
      ...values,
      tutorial_cost: Number(values.tutorial_cost),
    }
    return formattedValues
  }

  public handleUploadStepImgSuccess = (fileInfo: IFirebaseUploadInfo) => {
    console.log('index', this.state._currentStepIndex)
    // get the current steps
    const currentSteps: any = this.state.formValues.steps
    // get the step at the index where the new image will go
    // use the spread operator to merge the existing images with the new url
    currentSteps[this.state._currentStepIndex].images = [
      ...currentSteps[this.state._currentStepIndex].images,
      fileInfo.downloadUrl,
    ]
    console.log('this.state.formValues', this.state.formValues)
  }
  public handleUploadFilesSuccess = (fileInfo: IFirebaseUploadInfo) => {
    const files = this.state.formValues.tutorial_files
    files.push(fileInfo)
    console.log('files', files)
    this.setState({
      formValues: { ...this.state.formValues, tutorial_files: files },
    })
  }

  /* EXAMPLE
    You want to pass the step index to the handle upload step image success function
    When you have the url of the image you want to merge it with the existing step images
    Then merge the updated step with all steps and update the state
  */
  public handleUploadCoverSuccess = (fileInfo: IFirebaseUploadInfo) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        cover_image_url: fileInfo.downloadUrl,
      },
    })
  }

  public onInputChange = (event: any, inputType: string) => {
    // *** TODO the event.target.value needs to be formated as the article id
    switch (inputType) {
      case 'tutorial_title':
        const clearUrlSlug = event.target.value
          .replace(/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, '')
          .split(' ')
          .join('-')
        this.setState({
          formValues: {
            ...this.state.formValues,
            tutorial_title: event.target.value,
            slug: encodeURIComponent(clearUrlSlug),
          },
          _uploadImgPath: 'uploads/' + encodeURIComponent(clearUrlSlug),
          _uploadFilesPath: 'uploads/' + encodeURIComponent(clearUrlSlug),
        })
        break
      case 'tutorial_extern_file_url':
        // TODO check is proper url
        this.setState({
          formValues: {
            ...this.state.formValues,
            tutorial_extern_file_url: event.target.value,
          },
        })
      default:
        this.setState({
          formValues: {
            ...this.state.formValues,
            [inputType]: event.target.value,
          },
        })
        break
    }
  }

  public render() {
    return (
      <div>
        <Typography
          style={{ margin: '30px auto', display: 'table' }}
          variant="h4"
          component="h4"
        >
          Create documentation
        </Typography>
        <Form
          onSubmit={this.onSubmit}
          initialValues={this.state.formValues}
          mutators={{
            ...arrayMutators,
          }}
          render={({ handleSubmit, submitting, values, form, invalid }) => {
            return (
              <div className="create-tutorial-form__container">
                <form className="create-tutorial-form" onSubmit={handleSubmit}>
                  <div className="create-tutorial-infos__container">
                    <Typography
                      component="label"
                      className="create-tutorial__label"
                    >
                      What is your davehakkens.nl account ?
                    </Typography>
                    <Field name="workspace_name" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            placeholder="@janedoe"
                            className="create-tutorial__input"
                            onBlur={(event: any) => {
                              this.onInputChange(event, 'workspace_name')
                            }}
                          />
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <Typography
                      component="label"
                      className="create-tutorial__label"
                    >
                      What is the title of your documentation ?
                    </Typography>
                    <Field name="tutorial_title" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            className="create-tutorial__input"
                            type="text"
                            onBlur={(event: any) => {
                              this.onInputChange(event, 'tutorial_title')
                            }}
                            placeholder="How to make XXX using YYY"
                          />
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <div
                      className={
                        this.state.formValues.slug === ''
                          ? 'create-tutorial-form__title__note--clear'
                          : 'create-tutorial-form__title__note--filled'
                      }
                    >
                      {window.location.host +
                        '/docs/' +
                        this.state.formValues.slug}
                    </div>
                    <Typography
                      component="label"
                      className="create-tutorial__label"
                    >
                      Add tags
                    </Typography>
                    <div className="create-tutorial__tags--container">
                      {tags.map((tag, index) => (
                        <div key={index} className="create-tutorial__tag">
                          <Input
                            type="checkbox"
                            name={tags[index].label}
                            value={tags[index]._key}
                            id={tags[index]._key}
                            className="create-tutorial__checkbox"
                            onChange={(e: any) => {
                              console.log(e.target.checked)
                              if (e.target.checked) {
                                // push the tag in the value array
                                selectedTags.push(e.target.value)
                              } else {
                                // remove from the array of tags
                                selectedTags = selectedTags.filter(
                                  (item: any) => item !== e.target.value,
                                )
                              }
                              // set state with updated tags list
                              this.setState({
                                formValues: {
                                  ...this.state.formValues,
                                  tags: selectedTags,
                                },
                              })
                            }}
                          />
                          <label htmlFor={tags[index].label}>
                            {tags[index].label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {this.state.formValues.cover_image_url && (
                      <img
                        className="cover-img"
                        src={this.state.formValues.cover_image_url}
                        alt={
                          'cover image - ' +
                          this.state.formValues.tutorial_title
                        }
                      />
                    )}
                    <FirebaseFileUploader
                      storagePath={this.state._uploadImgPath}
                      hidden={true}
                      accept="image/png, image/jpeg"
                      name="coverImg"
                      onUploadSuccess={this.handleUploadCoverSuccess}
                      buttonText="Upload a cover image"
                    />
                    Write a short description for the documentation
                    <Field name="tutorial_description" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <textarea
                            {...input}
                            placeholder="This is what we will do"
                            onBlur={(event: any) => {
                              this.onInputChange(event, 'tutorial_description')
                            }}
                            className="create-tutorial__input"
                          />
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field name="tutorial_time" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <Typography
                            component="label"
                            className="create-tutorial__label"
                          >
                            How much time does it take ? (hours/week)
                          </Typography>
                          <Input
                            {...input}
                            type="text"
                            className="create-tutorial__input"
                            placeholder="2 hours"
                            onBlur={(event: any) => {
                              this.onInputChange(event, 'tutorial_time')
                            }}
                          />
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field name="tutorial_cost" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <Typography
                            component="label"
                            className="create-tutorial__label"
                          >
                            How much does it cost (roughly in USD)?
                          </Typography>
                          <Input
                            {...input}
                            type="number"
                            className="create-tutorial__input"
                            onBlur={(event: any) => {
                              this.onInputChange(event, 'tutorial_cost')
                            }}
                            placeholder="10"
                            startAdornment={
                              <InputAdornment
                                position="start"
                                className="input__prefix--dollar"
                              >
                                $
                              </InputAdornment>
                            }
                          />
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <Typography
                      component="label"
                      className="create-tutorial__label"
                    >
                      How difficult to replicate is your documentation ?
                    </Typography>
                    <Field
                      name="difficulty_level"
                      onBlur={(event: any) => {
                        this.onInputChange(event, 'difficulty_level')
                      }}
                      component="select"
                      className="create-tutorial__input input--selector"
                    >
                      <option value="easy">easy</option>
                      <option value="medium">medium</option>
                      <option value="difficult">difficult</option>
                    </Field>
                    <Typography
                      component="label"
                      className="create-tutorial__label"
                    >
                      File to support your documentation ? (20mb max)
                    </Typography>
                    <FirebaseFileUploader
                      hidden
                      accept="*"
                      name="files"
                      buttonText="Upload a file"
                      storagePath={this.state._uploadImgPath}
                      onUploadSuccess={this.handleUploadFilesSuccess}
                    />
                    <span className="uploaded-file-name" />
                    <Field name="tutorial_extern_file_url">
                      {({ input, meta }) => (
                        <div>
                          <Typography
                            component="label"
                            className="create-tutorial__label"
                          >
                            Or a link
                          </Typography>
                          <Input
                            {...input}
                            type="text"
                            className="create-tutorial__input"
                            placeholder="https://drive.google.com/drive/u/2/folders/..."
                            onBlur={(event: any) => {
                              this.onInputChange(
                                event,
                                'tutorial_extern_file_url',
                              )
                            }}
                          />
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <div />
                    <FieldArray name="steps">
                      {({ fields }) =>
                        fields.map((step, index) => (
                          <div className="step__container" key={index}>
                            <Card key={step} className="step__card">
                              <div className="step__header">
                                <Typography
                                  variant="h5"
                                  component="h2"
                                  className="step-number"
                                >
                                  Step {index + 1}
                                </Typography>
                              </div>
                              <CardContent>
                                <div>
                                  <Typography
                                    component="label"
                                    className="create-tutorial__label"
                                  >
                                    Pick a title for this step
                                  </Typography>
                                  <Field
                                    name={`${step}.title`}
                                    component="input"
                                    placeholder="Step title"
                                    validate={required}
                                    className="create-tutorial__input"
                                  />
                                  <Typography
                                    component="label"
                                    className="create-tutorial__label"
                                  >
                                    Describe this step
                                  </Typography>
                                  <Field
                                    name={`${step}.text`}
                                    component="textarea"
                                    placeholder="Description"
                                    validate={required}
                                    className="create-tutorial__input"
                                    onBlur={() => {
                                      // update the state with the new values
                                      const stepValuesInput: any = form.getFieldState(
                                        'steps',
                                      )!.value
                                      this.setState({
                                        formValues: {
                                          ...this.state.formValues,
                                          steps: stepValuesInput,
                                        },
                                      })
                                    }}
                                  />
                                </div>

                                {this.state.formValues.steps[index] &&
                                  this.state.formValues.steps[index].images
                                    .length >= 1 &&
                                  this.state.formValues.steps[index].images.map(
                                    (stepImg, stepImgindex) => (
                                      <img
                                        key={stepImgindex}
                                        className="step-img"
                                        src={stepImg}
                                      />
                                    ),
                                  )}

                                <FirebaseFileUploader
                                  hidden
                                  buttonText="Upload picture(s)"
                                  name={`${step}.images`}
                                  storagePath={this.state._uploadImgPath}
                                  onUploadSuccess={
                                    this.handleUploadStepImgSuccess
                                  }
                                  onClick={() => {
                                    this.setState({
                                      _currentStepIndex: index,
                                    })
                                  }}
                                />
                              </CardContent>
                              {index >= 1 && (
                                <div
                                  onClick={() => fields.remove(index)}
                                  className="step-delete__button"
                                >
                                  <img src={DeleteIcon} alt="" />
                                  <span>delete this step</span>
                                </div>
                              )}
                            </Card>
                          </div>
                        ))
                      }
                    </FieldArray>
                    <button
                      className="add-step__button"
                      onClick={() => {
                        // create a empty step in the steps form value
                        form.mutators.push('steps', {
                          title: '',
                          text: '',
                          images: [],
                        })
                        // update the state with the empty new step
                        const stepValuesInput: any = form.getFieldState(
                          'steps',
                        )!.value
                        this.setState({
                          formValues: {
                            ...this.state.formValues,
                            steps: stepValuesInput,
                          },
                        })
                      }}
                    >
                      <img src={AddIcon} alt="" />
                      <span>Add step</span>
                    </button>
                    <button
                      type="submit"
                      className="validate-form__button"
                      disabled={submitting || invalid}
                    >
                      <img src={SaveIcon} alt="" />
                      <span>Save</span>
                    </button>
                  </div>
                </form>
              </div>
            )
          }}
        />
      </div>
    )
  }
}
