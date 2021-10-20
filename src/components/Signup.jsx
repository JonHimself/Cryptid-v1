import React, { useState } from 'react'
import {
    Form,
    Input,
    Button,
    notification
  } from 'antd'
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios'
import './css/Signup.css'

const Signup = ({darkTheme}) => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [username, setUserName] = useState('')
    const history = useHistory();

    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 8,
        },
        lg: {
          span: 12,
        }
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
       
      },
    };

    const openNotification = (name) => {
        notification.open({
          message: `Success! Thank you for choosing Cryptid 😻`,
          description:
           `Try logging in ${name}`,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
        history.push('/')
        localStorage.removeItem("userInfo");
      };

    const onFinish = async (values) => {
       const {fullname: name, username, email, password} = values;
       try {
           const config = {
               headers: {
                   "Content-type": "application/json"
               }
           }
           setLoading(true)
           const {data} = await axios.post('http://localhost:8000/api/users', {name, username, email, password}, config);
           setLoading(false)
           localStorage.setItem("userInfo", JSON.stringify(data))
           console.log(data)
           setUserName(data.username)
           openNotification(username)
       } catch (error) {
            setError(error.response.data.message)
            console.log(error.response.data.message)
       }
      };

      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <>
        <p className={`signUpTitle ${darkTheme === true ? 'dark' : ''}`}>Sign-Up!</p>
        <Form layout='horizontal' className={`signUp ${darkTheme === true ? 'dark' : ''}`} {...formItemLayout} name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item style={{color: 'white'}} label='Full Name:' name='fullname' rules={[{required: true, message: 'You must have a name . . . right?'}]}>
            <Input  />
            </Form.Item >
            <Form.Item label='Username:' name='username' rules={[{required: true, message: 'You must choose a Username'}]}>
            <Input  className='signUpInput'/>
            </Form.Item>
            <Form.Item label='E-mail:' name='email' hasFeedback rules={[{type: "email", message: "Please enter a valid email"},{required: true, message: 'Your e-mails do not match'}]}>
            <Input  />
            </Form.Item>
            <Form.Item label='Confirm E-mail:' name='confirmE' hasFeedback rules={[{type: "email", message: "Please enter a valid email"},{required: true, message: 'E-mails do not match'}]}>
            <Input />
            </Form.Item>
            <Form.Item  label='Password:' name='password' hasFeedback rules={[{required: true, message: 'Please choose a password'}]}>
            <Input />
            </Form.Item>
            <Form.Item  label='Confirm Password:' name='confirmP' hasFeedback dependencies={["password"]} rules={[{required: true, message: 'Please confirm your password'}, ({getFieldValue}) => ({
                validator(_, value){
                    if(!value || getFieldValue("password") === value){
                        return Promise.resolve()
                    }
                    return Promise.reject("Your passwords do not match")
                }
            })]}>
            <Input />
            </Form.Item>
            <Button id='registerBtn' type="primary" htmlType="submit">
             Sign-Up
            </Button>
            <p className={`signUpOffer ${darkTheme === true ? 'dark' : ''}`}>* Register for a free download of Cryptid's Ticker!</p>
        </Form>
    </>
    )
}

const mapStateToProps = (state) => {
  return { darkTheme: state.darkTheme.darkTheme}
}

export default connect(mapStateToProps)(Signup);
