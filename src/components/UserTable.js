
import axios from '../service/RetrieverService';
import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, CardContent } from '@mui/material';
import ReactPaginate from "react-paginate";
import"../styles/table.css"
import TextField from "@mui/material/TextField";



export default function UserTable() {
    const [users, setusers] = useState([]);

    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 6;
    const offset = pageNumber * itemsPerPage;
    const [searchQuery, setSearchQuery] = useState('');
    const filteredPharmacies = users && users.filter((user) => user.email && user.email.includes(searchQuery));
    const currentPageItems = filteredPharmacies.slice(offset, offset + itemsPerPage);
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };



    useEffect(() => {
        axios.get("/api/controller/users/").then((response) => {
            setusers(response.data);
        });
    }, []);







    return (
        <div>
            <Card className="mx-3 mt-3 p-3">
                <CardContent >
                    <div style={{ alignItems: "center" }}>
                        <h3 >USERS</h3>
                    </div>
            <div className="table-responsive">
                <div className="header" style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"1rem"}}>
                    <TextField type="text" id="search-query"
                               label="Search" value={searchQuery} onChange={handleSearch} />
                </div>
                <table className="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        {/*<th>Username</th>*/}

                    </tr>
                    </thead>
                    <tbody>
                    {currentPageItems.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            {/* <td>{user.username}</td>*/}

                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="pagination-container">
                    <ReactPaginate
                        previousLabel={<button className="pagination-button">&lt;</button>}
                        nextLabel={<button className="pagination-button">&gt;</button>}
                        pageCount={Math.ceil(users.length / itemsPerPage)}
                        onPageChange={({ selected }) => setPageNumber(selected)}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                    />
                </div>
            </div>


                </CardContent>
            </Card>
        </div>
    );

}

