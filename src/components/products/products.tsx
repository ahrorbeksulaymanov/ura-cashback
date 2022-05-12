import { LeftOutlined } from "@ant-design/icons";
import { Button, Empty, Pagination, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { PATH_API } from "../../constants";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState<boolean>(true);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [pageSize, setpageSize] = useState<number>(10);
  const [total, settotal] = useState<number>(10);

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
      params: {
        size: pageSize,
        page: currentPage,
      },
    }).then((res) => {
      setloading(false);
      setData(res?.data?.items);
      settotal(res?.data?.total_count);
    });
  }, [pageSize, currentPage]);

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
            <Link to={`/company-products-search/${companyId.id}`}>
              <Button>Search</Button>
            </Link>
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
                  <th scope="row">{pageSize * currentPage + index + 1 - 10}</th>
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
          {total > 10 && (
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
          )}
        </div>
      )}
    </div>
  );
};
export default Products;
