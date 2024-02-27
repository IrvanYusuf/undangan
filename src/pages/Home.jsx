import { apiGuest } from "@/api/api";
import SectionBelumSelesai from "@/components/organism/SectionBelumSelesai";
import SectionCardStatistic from "@/components/organism/SectionCardStatistic";
import SectionSelesai from "@/components/organism/SectionSelesai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import imgNotFound from "../assets/not-found.jpg";
import { useAuth } from "@/context/authContext";

const Home = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("Selesai");
  const [search, setSearch] = useState(undefined);
  const [dataTamu, setDataTamu] = useState([]);
  const [totalTamu, setTotalTamu] = useState(null);
  const [totalBelumSelesai, SetTotalBelumSelesai] = useState(null);
  const [totalSelesai, setTotalSelesai] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  // const page = searchParams.get("page");
  // const limit = searchParams.get("limit");

  if (!token) {
    navigate("/login");
  }

  console.log(token);

  const handleParams = (value) => {
    setSearchParams({ status: value });
    setValue(value);
    setPage(0);
  };

  const getAllTamu = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${apiGuest}?status=${value}&limit=${limit}&page=${page}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setTotalPage(Math.ceil(data.total / limit));
      setDataTamu(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getLength = async () => {
    try {
      const response = await fetch(`${apiGuest}/length`, {
        method: "GET",
      });
      const data = await response.json();
      setTotalTamu(data.data[0].jumlah);
    } catch (error) {
      console.log(error);
    }
  };

  const getSumAmountSelesai = async () => {
    try {
      const response = await fetch(`${apiGuest}/amount/Selesai`, {
        method: "Get",
      });
      const data = await response.json();
      setTotalSelesai(data.data[0].total);
    } catch (error) {
      console.log(error);
    }
  };
  const getSumAmountBelumSelesai = async () => {
    try {
      const response = await fetch(`${apiGuest}/amount/Belum Selesai`, {
        method: "Get",
      });
      const data = await response.json();
      SetTotalBelumSelesai(data.data[0].total);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      if (search !== undefined && search !== "") {
        const response = await fetch(
          `${apiGuest}?search=${search}&status=${value}`,
          {
            method: "GET",
          }
        );
        setSearchParams({ search: search, status: value });
        console.log(search);
        const data = await response.json();
        setDataTamu(data.data);
        setTotalPage(data.totalPage);
        console.log(data);
      } else {
        setSearchParams({});
        const response = await fetch(
          `${apiGuest}?page=${page}&status=${value}`
        );
        const result = await response.json();
        console.log(result);
        setDataTamu(result.data);
        setTotalPage(Math.ceil(result.total / result.limit));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTamu();
  }, [value, page]);

  useEffect(() => {
    getSumAmountBelumSelesai();
    getSumAmountSelesai();
    getLength();
  }, []);

  return (
    <div className="sm:px-8 px-2 w-full">
      <SectionCardStatistic
        totalTamu={totalTamu}
        totalBelumSelesai={totalBelumSelesai}
        totalSelesai={totalSelesai}
      />
      <hr className="mt-8" />
      <div className="mt-8 flex flex-col gap-y-4">
        <div className="flex flex-1 gap-4">
          <Input
            type={"search"}
            placeholder="Cari......"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
            className="border sm:w-[300px] outline-none focus:border-none focus:outline-none ring-0"
          />
          <Button onClick={handleSearch} className="px-7">
            Cari
          </Button>
        </div>
        <Tabs defaultValue="Selesai">
          <div className="flex sm:flex-row flex-col-reverse sm:justify-between sm:items-center items-start gap-y-6">
            <TabsList className="grid grid-cols-2 bg-slate-300">
              <TabsTrigger
                value="Selesai"
                onClick={() => handleParams("Selesai")}
                name="status"
              >
                Selesai
              </TabsTrigger>
              <TabsTrigger
                value="Belum Selesai"
                onClick={() => handleParams("Belum Selesai")}
                name="status"
              >
                Belum Selesai
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="mt-10 min-h-screen">
            {isLoading ? (
              <div className="text-center">
                <ScaleLoader width={2} height={20} />
                <span>Loading....</span>
              </div>
            ) : dataTamu.length === 0 ? (
              <div className="flex flex-col justify-center items-center gap-y-2">
                <img
                  src={imgNotFound}
                  alt="not found image"
                  className="md:w-[300px] w-[200px]"
                />
                <div className="text-center">
                  <span className="md:text-2xl text-xl font-semibold">
                    Data Tidak ditemukan
                  </span>
                  <br />
                  <span>Silahkan cari berdasarkan nama</span>
                </div>
              </div>
            ) : (
              <div>
                <TabsContent value="Selesai">
                  <div className="h-fit">
                    <SectionSelesai
                      dataTamu={dataTamu}
                      getAllTamu={getAllTamu}
                      getSumAmountSelesai={getSumAmountSelesai}
                      getSumAmountBelumSelesai={getSumAmountBelumSelesai}
                    />
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={() => setPage(page - 1)}
                          />
                        </PaginationItem>
                        {[...Array(totalPage)].map((_, index) => (
                          <div key={index}>
                            {index === 0 && (
                              <PaginationItem>
                                <PaginationLink
                                  href="#"
                                  onClick={() => setPage(index)}
                                  active={page === index}
                                >
                                  {index + 1}
                                </PaginationLink>
                              </PaginationItem>
                            )}
                          </div>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={() =>
                              setPage(Math.min(page + 1, totalPage - 1))
                            }
                            disabled={page === totalPage - 1}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </TabsContent>
                <TabsContent value="Belum Selesai">
                  <div className="h-fit">
                    <SectionBelumSelesai
                      dataTamu={dataTamu}
                      getAllTamu={getAllTamu}
                      getSumAmountSelesai={getSumAmountSelesai}
                      getSumAmountBelumSelesai={getSumAmountBelumSelesai}
                    />
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            className={"p-0"}
                            href="#"
                            onClick={() => setPage(page - 1)}
                          />
                        </PaginationItem>
                        {[...Array(totalPage)].map((_, index) => (
                          <React.Fragment key={index}>
                            {index === 0 && (
                              <PaginationItem className={"p-0"}>
                                <PaginationLink
                                  className={"p-0"}
                                  href="#"
                                  onClick={() => setPage(index)}
                                  active={page === index}
                                >
                                  {index + 1}
                                </PaginationLink>
                              </PaginationItem>
                            )}
                            {index > 0 &&
                              index < totalPage - 1 &&
                              index >= page - 2 &&
                              index <= page + 2 && (
                                <PaginationItem className={"p-0"}>
                                  <PaginationLink
                                    className={"p-0"}
                                    href="#"
                                    onClick={() => setPage(index)}
                                    active={page === index}
                                  >
                                    {index + 1}
                                  </PaginationLink>
                                </PaginationItem>
                              )}
                          </React.Fragment>
                        ))}
                        <PaginationItem className={"p-0"}>
                          <PaginationNext
                            className={"p-0"}
                            href="#"
                            onClick={() =>
                              setPage(Math.min(page + 1, totalPage - 1))
                            }
                            disabled={page === totalPage - 1}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </TabsContent>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
