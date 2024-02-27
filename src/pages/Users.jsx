import Status from "@/components/atoms/Status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import { apiGuest } from "@/api/api";
import { useFormik } from "formik";
import * as yup from "yup";
import { notify } from "@/lib/utils";
import { ToastContainer } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import { useSearchParams } from "react-router-dom";
import imgNotFound from "../assets/not-found.jpg";
import ButtonEdit from "@/components/atoms/ButtonEdit";
import ButtonDelete from "@/components/atoms/ButtonDelete";
import ExpendedComponents from "@/components/atoms/ExpendedComponent";
import TambahData from "@/components/organism/TambahData";

const Title = () => {
  return <h2 className="text-2xl font-semibold">Data List Tamu Undangan</h2>;
};

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#020617",
    },
  },
  rows: {
    style: {
      fontSize: "16px",
      "&:hover": {
        backgroundColor: "#02061722",
      },
      // width: "10px",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      color: "white",
    },
  },
};

const Users = () => {
  const [dataTamu, setDataTamu] = useState([]);
  const onlyWidth = useWindowWidth();
  const [isloading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(undefined);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  // manggil api
  const getAllGuests = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiGuest}?page=${currentPage}`);
      const result = await response.json();
      setDataTamu(result.data);
      setTotalPage(Math.ceil(result.total / result.limit));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGuests();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page - 1); // Mengubah currentPage sesuai dengan halaman yang dipilih oleh pengguna
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.Id,
      omit: true,
    },
    {
      name: "No",
      selector: (row) => row.No,
      hide: "sm",
      // sortable: true,
    },
    {
      name: "Nama",
      selector: (row) => row.Nama,
      sortable: true,
    },
    {
      name: "Alamat",
      selector: (row) => row.Alamat,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Nominal",
      selector: (row) => row.Nominal,
      sortable: true,
      format: (row) =>
        row.Nominal && `Rp${row.Nominal.toLocaleString("id-ID")}`,
      hide: "sm",
    },
    {
      name: "Status",
      selector: (row) => row.Status,
      format: (row) => <Status text={row.Status} />,
      cell: (row) => <Status text={row.Status} />,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Detail",
      selector: (row) => row.Detail,
      cell: (row) => (
        <div className="flex gap-x-3">
          <ButtonEdit id={row.Id} getAllGuests={getAllGuests} />
          <ButtonDelete id={row.Id} getAllGuests={getAllGuests} />
        </div>
      ),
      hide: "sm",
    },
  ];

  const dataResult = dataTamu.map((data, i) => ({
    Id: data.guestId,
    No: i + 1,
    Nama: data.name,
    Alamat: data.address,
    Nominal: data.amount,
    Status: data.status,
  }));

  const handleNotify = () => {
    // Panggil notify saat tombol diklik
    notify("Berhasil Tambah Data", 1000, "success", "colored");
    // Tambahkan logika lain yang diperlukan di sini
  };

  const schema = yup.object().shape({
    name: yup.string().required("Nama tidak boleh kosong"),
    address: yup.string().required("Alamat tidak boleh kosong"),
    amount: yup
      .number()
      .positive()
      .integer()
      .required("Nominal tidak boleh kosong"),
  });

  const createTamu = async (values) => {
    try {
      const response = await fetch(`${apiGuest}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          credentials: true,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.status === 201) {
        handleNotify();
      }
      // reset.form();
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  // handle search
  const handleSearch = async () => {
    try {
      if (search !== undefined && search !== "") {
        const response = await fetch(`${apiGuest}?search=${search}`, {
          method: "GET",
        });
        setSearchParams({ search: search });
        const data = await response.json();
        setDataTamu(data.data);
        setTotalPage(data.totalPage);
      } else {
        setSearchParams({});
        const response = await fetch(`${apiGuest}?page=${currentPage}`);
        const result = await response.json();
        setDataTamu(result.data);
        setTotalPage(Math.ceil(result.total / result.limit));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      amount: "",
      status: "Belum Selesai",
    },
    validationSchema: schema,
    // onSubmit: onSubmit,
    onSubmit: (values, { resetForm }) => {
      createTamu(values);
    },
  });

  return (
    <div className="px-2">
      <div className="flex md:justify-between flex-col-reverse md:flex-row justify-start items-start md:gap-y-0 gap-y-5 mb-4">
        <div className="flex flex-1 gap-4">
          <Input
            type={"search"}
            placeholder="Cari......"
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
            className="border sm:w-[300px] outline-none focus:border-none focus:outline-none ring-0"
          />
          <Button className="px-7" onClick={handleSearch}>
            Cari
          </Button>
        </div>
        <TambahData formik={formik} />
      </div>
      <ToastContainer />
      <DataTable
        title={<Title />}
        columns={columns}
        data={dataResult}
        pagination
        paginationServer
        paginationTotalRows={totalPage * 10}
        paginationPerPage={10}
        onChangePage={handlePageChange}
        customStyles={customStyles}
        expandableRows={onlyWidth < 431 ? true : false}
        expandableRowsComponent={ExpendedComponents}
        expandableRowsComponentProps={{ getAllGuests: getAllGuests }}
        noDataComponent={
          isloading ? (
            <div className="text-center">
              <ScaleLoader width={2} height={20} />
              <span>Loading....</span>
            </div>
          ) : (
            <div className="text-center">
              <img
                src={imgNotFound}
                alt="not found image"
                className="md:w-[300px] w-[200px]"
              />
              <span className="md:text-2xl text-xl font-semibold">
                Data Tidak ditemukan
              </span>
              <br />
              <span>Silahkan cari berdasarkan nama</span>
            </div>
          )
        }
      />
    </div>
  );
};

export default Users;
