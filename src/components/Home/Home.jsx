import "./home.scss";
import { useState } from "react";
import { TableList } from "../Table/Table";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { removeCheckedUser } from "../../features/users/usersSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [checkedId, setCheckedId] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const { users } = useSelector((store) => store.users);

  const keys = ["name", "email", "role"];

  const usersPerPage = 10;
  const usersVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  const handleCheckedClick = (id) => {
    setIsChecked(!isChecked);
    setCheckedId([...checkedId, id]);
  };

  return (
    <div className="home">
      <div className="table-container">
        <div className="search">
          <input
            type="text"
            placeholder="Search by name, email or role"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <TableList
          isChecked={isChecked}
          handleCheckedClick={handleCheckedClick}
          users={search(users).slice(usersVisited, usersVisited + usersPerPage)}
        />
      </div>
      <div className="pagination">
        <div className="pagination-left">
          <button
            className="dltBtn"
            onClick={() => dispatch(removeCheckedUser(checkedId))}
          >
            Delete Selected
          </button>
        </div>
        <div className="pagination-right">
          <ReactPaginate
            previousAriaLabel={"Previous"}
            nextAriaLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </div>
    </div>
  );
};
