import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, message } from 'antd';
import PropTypes from 'prop-types';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const ArticleForm = ({ article, user, error, asyncCreateArticle, reset, mission, asyncEditArticle }) => {
  useEffect(() => {
    return reset;
  }, [reset]);


  const {slug} = article;
  const [form] = Form.useForm();

  const onFinish = ({ title, shortDescription, text, tagList}) => {
    if(error) message.error('Failed');

    if(mission === 'edit') {
      return asyncEditArticle(user.token, title, shortDescription, text, tagList, slug)
    }
      return asyncCreateArticle(user.token, title, shortDescription, text, tagList);
  };

  const head = mission === "edit" ? 'Edit Article' : 'Create new article';

  const initialValues = mission === 'edit' ? {
    title: article.title,
    shortDescription: article.description,
    text: article.body,
    tagList:article.tagList,
  } : null;

  return (
    <Form
      {...formItemLayout}
      className="form form__create"
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      initialValues={initialValues}
    >
      <h2>{head}</h2>
      <Form.Item
        name="title"
        label="Title"
        className="form__item"
        rules={[
          {
            required: true,
            message: 'Please input title',
            whitespace: true,
          },
          () =>({
            validator(rule, value){
              if(value.length > 16){
                return Promise.reject(
                  "Title must be less then 16 characters"
                );
              }
              return Promise.resolve();
            }
          })
        ]}
      >
        <Input placeholder="Title" className="form__input"/>
      </Form.Item>

      <Form.Item
        name="shortDescription"
        label="Short description"
        className="form__item"
        rules={[
          {
            required: true,
            message: 'Please input short description',
          },
          () =>({
            validator(rule, value){
              if(value.length > 32){
                return Promise.reject(
                  "Short description must be less then 32 characters"
                );
              }
              return Promise.resolve();
            }
          })
        ]}
      >
        <Input placeholder="Description" className="form__input"/>
      </Form.Item>

      <Form.Item
        name="text"
        label="Text"
        className="form__item"
        rules={[
          {
            required: true,
            message: 'Please enter text article',
          },
        ]}
      >
        <Input.TextArea placeholder="Text" className="form__input" style={{ height: 168 }}/>
      </Form.Item>

      <Form.List name="tagList">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (

              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                required={false}
                key={field.key}
                className="form__row"
              >
                <Form.Item
                  style={{ marginLeft: 0}}
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Please input tag or delete this field.',
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="Tag" className="input__tag"/>
                </Form.Item>

                <Button
                  className="btn__tag btn__tag-del"
                  type="danger" ghost
                  onClick={() => remove(field.name)}
                >Delete</Button>
                <Button
                  className="btn__tag btn__tag-add"
                  type="primary" ghost
                  onClick={() => add()}
                >Add Tag</Button>

              </Form.Item>
            ))}

            {(fields.length === 0) ? <Form.Item style={{textAlign: 'left'}}>
              <Button
                type="primary" ghost
                className="btn__tag btn__tag-add"
                onClick={() => add()}
              >
                Add tag
              </Button>
              <Form.ErrorList errors={errors}/>
            </Form.Item> : null}
          </>
        )}
      </Form.List>

      <Form.Item {...tailFormItemLayout} style={{textAlign:'left'}}>
        <Button type="primary"
                className="btn__save"
                block
                htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

ArticleForm.defaultProps = {
  asyncEditArticle: () => {},
  asyncCreateArticle: () => {},
  reset: () => {},
  successEditing: false,
  mission: '',
}

ArticleForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
  article: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,

  }).isRequired,
  error: PropTypes.bool.isRequired,
  asyncEditArticle:PropTypes.func,
  asyncCreateArticle:PropTypes.func,
  reset: PropTypes.func.isRequired,
  mission: PropTypes.string,
};

export default ArticleForm;
