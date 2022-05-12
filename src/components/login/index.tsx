import "./style.scss";
import { Form, Button, message } from "antd";
import loginImg from "../../images/login.webp";
import { PATH_API } from "../../constants";
import axios from "axios";
import InputMask from "react-input-mask";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [type, setType] = useState<boolean>(false);
  const history = useNavigate();
  const [time, setTime] = useState<number>(120)

  const timeEnd = () => {
    setType(false); 
    form.resetFields()
  }
  useEffect(() => {
    if(localStorage.getItem("token")){
      setType(true)
    }else{
      setType(false)
    }
  }, [])
  let finishTime:any;
  useEffect(() => {
    if(type){
      if(time>0){
        finishTime = setTimeout(() => {
          setTime(time-1)
        }, 1000);
      }else if(time === 0){
        timeEnd()
        clearTimeout(finishTime)
      }
    }
  }, [time,type])

  const getCode = (values: any) => {
    const data = {
      phoneNumber: values.number.replaceAll("-", "").replaceAll("+", ""),
    };
    axios.post(PATH_API + `/security/send-verification`, data).then((res) => {
      if(res?.status == 204){
        setType(true);
      }
    }).catch(err => {
      message.error("Internet bilan xatolik!")
    });
  };

  const sendVerification = (values: any) => {
    const data = {
      phoneNumber: values.number.replaceAll("-", "").replaceAll("+", ""),
      code: values.code.replaceAll("-", ""),
    };
    axios.post(PATH_API + `/security/verify-login`, data).then((res) => {
      if (res?.status === 200) {
        localStorage.setItem("token", res?.data?.token);
        history("/admin");
      }else{
        console.log("ressss",res);
        
      }
    }).catch(err => {
      console.log("err", err);
      message.error(err.response.data[0])
    });
  };

  return (
    <div className="big-div-login">
      <div className="row m-0">
        <div className="col-md-8 p-0">
          <img src={loginImg} alt="" />
        </div>
        <div className="col-md-4 p-0">
          <div className="height_100">
            <div className="pt-5 ms-4">
              {/* <Link to='/' >Asosiy sahifaga o'tish</Link> */}
            </div>
            <div className="d-flex align-items-center justify-content-center height_90">
              <div>
                <h4>Welcome to Login page</h4>
                <Form
                  form={form}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={type ? sendVerification : getCode}
                  autoComplete="off"
                >
                  <Form.Item
                    name="number"
                    rules={[
                      {
                        required: true,
                        message: "Please input your tel number!",
                      },
                    ]}
                  >
                    <InputMask
                      placeholder="Tel number"
                      className="input-mask-login"
                      mask="+\9\9\8-99-999-99-99"
                    />
                  </Form.Item>
                  {type && (   
                    <>                 
                      <span className={`${time<=15 && "text-danger"}`}>{time + " sekund"}</span>
                    <Form.Item
                      name="code"
                      rules={[
                        {
                          required: true,
                          message: "Please input your code!",
                        },
                      ]}
                    >
                      <InputMask
                        placeholder="Code"
                        className="input-mask-login"
                        mask="9-9-9-9"
                      />
                    </Form.Item>
                    </>
                  )}

                  <Form.Item className="text-center">
                    <Button
                      className="w-100 login-button"
                      type="primary"
                      htmlType="submit"
                    >
                      Login
                    </Button>
                  </Form.Item>
                  {type && (
                    <Button
                      className="w-100 login-button"
                      onClick={timeEnd}
                    >
                      Send again
                    </Button>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
