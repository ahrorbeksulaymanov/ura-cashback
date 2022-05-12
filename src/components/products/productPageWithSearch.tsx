import { LeftOutlined } from "@ant-design/icons";
import { Empty, Input, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { PATH_API } from "../../constants";

const ProductsWithSearch = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setloading] = useState<boolean>(true);

  const navigate = useNavigate();
  const companyId = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setloading(true);
    axios({
      url: PATH_API + `/companies/${companyId.id}/products`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      setloading(false);
      setData(res?.data?.items);
      setData2(res?.data?.items);
    });
  }, []);

  const filterVal = (e:string) => {
      setData(data2.filter((item:any) => item.name.toLowerCase().includes(e.toLowerCase())))
  }

  return (
    <div>
      {loading ? (
        <div className="text-center" style={{ margin: "30vh 0" }}>
          <Spin tip="Loading..."></Spin>
        </div>
      ) : (
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="d-flex align-items-center justify-content-between">
                <span
                  className="d-flex align-items-center pointer"
                  onClick={() => navigate(-1)}
                >
                  <LeftOutlined />
                  Back{" "}
                </span>{" "}
                / Products
            </h5>
              <Input style={{width:"200px"}} placeholder="Search..." onChange={(e)=>filterVal(e.target.value)} />
          </div>
          <hr />
          
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: "0" }}>
              {data?.map((item: any, index: number) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item?.id}</td>
                  <td>{item?.name}</td>
                  <td>{item?.category?.name}</td>
                  <td>{item?.description?.slice(0, 25)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {
              data?.length === 0 && <Empty />
          }
        </div>
      )}
    </div>
  );
};
export default ProductsWithSearch;
