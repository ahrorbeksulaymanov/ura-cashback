import { EyeOutlined } from "@ant-design/icons";
import { Empty, Pagination, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { PATH_API } from "../../constants";

const Companies = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState<boolean>(true);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [pageSize, setpageSize] = useState<number>(10);
  const [total, settotal] = useState<number>(10);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setloading(true);
    axios({
      url: PATH_API + `/companies`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        size: pageSize,
        page: currentPage,
      },
    })
      .then((res) => {
        setloading(false);
        setData(res?.data?.items);
        settotal(res?.data?.total_count);
      })
      .catch((err) => {});
  }, [pageSize, currentPage]);
  return (
    <div>
      {loading ? (
        <div className="text-center" style={{ margin: "30vh 0" }}>
          <Spin tip="Loading..."></Spin>
        </div>
      ) : (
        <div>
          <h5>Companies</h5>
          <hr />
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Company Name</th>
                <th>Short description</th>
                <th>Currency</th>
                <th>Products view</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: "0" }}>
              {data?.map((item: any, index: number) => (
                <tr key={index}>
                  <th scope="row">{pageSize * currentPage + index + 1 - 10}</th>
                  <td>{item?.id}</td>
                  <td>{item?.name}</td>
                  <td>{item?.short_description}</td>
                  <td>{item?.currency}</td>
                  <td className="text-center">
                    <Link to={`/company-products/${item?.id}`}>
                      <EyeOutlined className="text-success pointer" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {
              data?.length === 0 && <Empty />
          }
          {
            total > 10 &&
            <div className="d-flex justify-content-end">
              <Pagination
                pageSize={pageSize}
                current={currentPage}
                total={total}
                onChange={(page: number, pageSize: number) => {
                  setcurrentPage(page);
                  setpageSize(pageSize);
                }}
              />
            </div>
          }
        </div>
      )}
    </div>
  );
};
export default Companies;
