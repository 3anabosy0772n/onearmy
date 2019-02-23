import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Form, Field, FieldProps, FieldRenderProps } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { IPostFormInput } from 'src/models/discussions.models'
import { POST_TEMPLATE_DATA } from './PostTemplate'
import { UploadedFile } from 'src/pages/common/UploadedFile/UploadedFile'
import { InputField } from 'src/components/Form/Fields'
import { Editor, VARIANT } from 'src/components/Editor/'
import { IDiscussionPost } from 'src/models/discussions.models'
import { Button } from 'src/components/Button/'
import { DiscussionsStore } from 'src/stores/Discussions/discussions.store'
import { inject } from 'mobx-react'
import { IStores } from 'src/stores'

interface IState {
  formValues: IPostFormInput
  formSaved: boolean
}

interface IProps extends RouteComponentProps {
  discussionsStore: DiscussionsStore
}

const required = (value: any) => (value ? undefined : 'Required')

@inject((allStores: IStores) => ({
  discussionsStore: allStores.discussionsStore,
}))
export class PostCreate extends React.PureComponent<IProps, IState> {
  uploadRefs: { [key: string]: UploadedFile | null } = {}
  constructor(props: any) {
    super(props)
    this.state = {
      formValues: { ...POST_TEMPLATE_DATA },
      formSaved: false,
    }
  }

  public onSubmit = async (formValues: IPostFormInput) => {
    console.log('formvalues', formValues)
    try {
      // const post = await this.props.discussionsStore.createDiscussion(
      //   formValues,
      // )
      // console.log('post', post)
      // this.props.history.push('/discussions/' + post.slug)
    } catch (error) {
      console.log('err', error)
      console.log('error while saving the Post')
    }
  }

  public validate = async (formValues: IPostFormInput) => {
    // TODO: validate cover image exists
    // if (this.state.formValues.cover_image_url === '') {
    // alert('Please provide a cover image before saving your tutorial')
    return Promise.resolve({})
  }

  public EditorField: React.ComponentType<FieldRenderProps> = ({
    input,
    meta,
    ...rest
  }) => (
    <Editor
      content={input.value}
      variant={VARIANT.SMALL}
      onChange={content => {
        input.onChange(content)
        return true
      }}
      {...rest}
    />
  )

  public render() {
    const { formValues } = this.state
    console.log('rendering', formValues)
    return (
      <div>
        <h2 style={{ marginTop: 0 }}>Create a Post</h2>
        <Form
          onSubmit={values => this.onSubmit(values as IPostFormInput)}
          initialValues={formValues}
          validate={() => this.validate}
          mutators={{
            ...arrayMutators,
            clearCoverImage: (args, state, utils) => {
              utils.changeValue(state, 'cover_image', () => null)
            },
          }}
          render={({
            handleSubmit,
            mutators,
            submitting,
            values,
            form,
            invalid,
          }) => {
            const v = values as IDiscussionPost
            return (
              <div>
                <form onSubmit={handleSubmit}>
                  <Field
                    name="title"
                    validate={required}
                    component={InputField}
                    label="What is the title of your post ?"
                    placeholder="Post title"
                  />
                  <Field
                    name="content"
                    component={this.EditorField}
                    validate={required}
                    label="What would you like to discuss?"
                  />

                  <Button
                    type="submit"
                    icon={'check'}
                    disabled={submitting || invalid}
                  >
                    Save
                  </Button>
                </form>
              </div>
            )
          }}
        />
      </div>
    )
  }
}
