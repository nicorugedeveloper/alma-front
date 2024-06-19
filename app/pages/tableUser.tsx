"use client"; // Esto marca el componente como cliente
import React, { useEffect, useState } from "react";
import { listUser } from "@/services/listUser.service";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Pagination,
} from "@mui/material";
import FilterList from "@/components/filterList";

export default function TablesUserList() {
  const [datos, setDatos] = useState<any[]>([]);
  const [filteredDatos, setFilteredDatos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [selectedRowAddress, setSelectedRowAddress] = useState<number | null>(
    null
  );
  const [selectedRowCompany, setSelectedRowCompany] = useState<number | null>(
    null
  );
  const [filter, setFilter] = useState("");

  const [alert, setAlert] = useState("");

  useEffect(() => {
    setLoading(true);
    listUser().then((response) => {
      setDatos(response);
      setFilteredDatos(response);
      setTotal(response.length);
      setLoading(false);

      response.length === 0
        ? setAlert("!Data not available - service error")
        : setAlert("");
    });
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filter, datos]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleRowClick = (index: number) => {
    setSelectedRowAddress(null);
    setSelectedRowCompany(null);
  };

  const handleAddressClick = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    setSelectedRowAddress(selectedRowAddress === index ? null : index);
  };

  const handleCompanyClick = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    setSelectedRowCompany(selectedRowCompany === index ? null : index);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const applyFilter = () => {
    if (!filter) {
      setFilteredDatos(datos);
      setTotal(datos.length);
      return;
    }
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = datos.filter((item) =>
      Object.keys(item).some((key) =>
        typeof item[key] === "string"
          ? item[key].toLowerCase().includes(lowercasedFilter)
          : typeof item[key] === "object"
          ? Object.keys(item[key]).some((subKey) =>
              typeof item[key][subKey] === "string"
                ? item[key][subKey].toLowerCase().includes(lowercasedFilter)
                : false
            )
          : false
      )
    );
    setFilteredDatos(filteredData);
    setTotal(filteredData.length);
  };

  const paginatedData = filteredDatos.slice((page - 1) * limit, page * limit);

  return (
    <div className="w-full">
      <FilterList filter={filter} onFilterChange={handleFilterChange} />
      {alert && (
        <div className="w-full px-4 py-2 m-auto bg-yellow-600 text-gray-900 font-medium text-center rounded-sm mb-4 shadow">
          {alert}
        </div>
      )}
      <TableContainer component={Paper}>
        <Table className="w-full table-auto">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="truncate px-2">
                Name
              </TableCell>
              <TableCell align="center" className="truncate px-2">
                Username
              </TableCell>
              <TableCell align="center" className="truncate px-2">
                Email
              </TableCell>
              <TableCell align="center" className="truncate px-2">
                Address
              </TableCell>
              <TableCell align="center" className="truncate px-2">
                Phone
              </TableCell>
              <TableCell align="center" className="truncate px-2">
                Website
              </TableCell>
              <TableCell align="center" className="truncate px-2">
                Company
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((user, index) => (
              <React.Fragment key={index}>
                <TableRow
                  hover
                  className="cursor-pointer"
                  onClick={() => handleRowClick(index)}
                >
                  <TableCell align="center" className="max-w-xs truncate px-2">
                    {user.name ?? "N/A"}
                  </TableCell>
                  <TableCell align="center" className="max-w-xs truncate px-2">
                    {user.username ?? "N/A"}
                  </TableCell>
                  <TableCell align="center" className="max-w-xs truncate px-2">
                    {user.email ?? "N/A"}
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={(event) => handleAddressClick(event, index)}
                    className="max-w-xs truncate px-2"
                  >
                    <span className="hover:underline">
                      Click to see address
                    </span>
                  </TableCell>
                  <TableCell align="center" className="max-w-xs truncate px-2">
                    {user.phone ?? "N/A"}
                  </TableCell>
                  <TableCell align="center" className="max-w-xs truncate px-2">
                    {user.website ?? "N/A"}
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={(event) => handleCompanyClick(event, index)}
                    className="max-w-xs truncate px-2"
                  >
                    <span className="hover:underline">
                      Click to see company
                    </span>
                  </TableCell>
                </TableRow>

                {selectedRowAddress === index && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="p-4 bg-gray-100 border border-gray-300 rounded-md">
                        <div className="flex gap-2 justify-center flex-wrap">
                          <span className="px-3 py-1 truncate">
                            <b>City: </b>
                            {user.address?.city ?? "N/A"}
                          </span>
                          <span className="px-3 py-1 truncate">
                            <b>Street: </b>
                            {user.address?.street ?? "N/A"}
                          </span>
                          <span className="px-3 py-1 truncate">
                            <b>Suite: </b>
                            {user.address?.suite ?? "N/A"}
                          </span>
                          <span className="px-3 py-1 truncate">
                            <b>Zipcode: </b> {user.address?.zipcode ?? "N/A"}
                          </span>
                          <span className="px-3 py-1 truncate">
                            <b>Geo: </b>Lat {user.address?.geo?.lat ?? "N/A"},
                            Lng {user.address?.geo?.lng ?? "N/A"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {selectedRowCompany === index && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="p-4 bg-gray-100 border border-gray-300 rounded-md">
                        <div className="flex gap-2 justify-center flex-wrap">
                          <span className="px-3 py-1 truncate">
                            <b>Company Name: </b>
                            {user.company?.name ?? "N/A"}
                          </span>
                          <span className="px-3 py-1 truncate">
                            <b>CatchPhrase: </b>
                            {user.company?.catchPhrase ?? "N/A"}
                          </span>
                          <span className="px-3 py-1 truncate">
                            <b>BS: </b>
                            {user.company?.bs ?? "N/A"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={handlePageChange}
          className="w-full flex justify-center my-4"
        />
      </TableContainer>
      {loading && (
        <div className="w-full flex justify-center my-4">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
