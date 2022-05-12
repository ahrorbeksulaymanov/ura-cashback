import { useNavigate  } from "react-router";
import { Result, Button } from "antd";

const NotFound = () => {
  const history = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Kechirasiz, siz tashrif buyurgan sahifa mavjud emas."
      extra={<Button onClick={() => history(-1)} type="primary">Orqaga</Button>}
    />
  );
};

export default NotFound;