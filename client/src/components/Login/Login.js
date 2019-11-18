
import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    });
  };

  render() {
  const { getFieldDecorator } = this.props.form;
  return (
    <>
      <div style={{ padding: 24, background: '#fff', maxWidth: 350, minHeight: 600, align: 'center' }}>
        <Form 
          onSubmit={this.handleSubmit} 
          className="login-form"
          
          >
          <Form.Item>
            {getFieldDecorator('mail', {
              rules: [{ required: true, message: '이메일 주소를 입력해주세요!' }],
            })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="이메일"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '비밀번호를 입력해주세요.!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="비밀번호"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              로그인
            </Button>            
          </Form.Item>
          <Form.Item>
            <div className="">
              <Link to="">회원가입</Link>
              <Link to="">비밀번호 찾기</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
      
    </>  
    )
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)

export default WrappedNormalLoginForm