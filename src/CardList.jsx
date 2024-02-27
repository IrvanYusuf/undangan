import React from "react";
import { Button } from "./components/ui/button";
import Status from "./components/atoms/Status";
import "react-toastify/dist/ReactToastify.css";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";
import { HelpCircle, Trash2 } from "lucide-react";
import { apiGuest } from "./api/api";

const ButtonChangeStatus = ({ buttonName, handleChangeStatus }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <Button
          className={`
            ${
              buttonName === "Selesai" &&
              "bg-[rgb(235,102,102)] hover:bg-[#EB6666]"
            } w-full`}
        >
          {buttonName === "Selesai" ? "Belum Selesaikan" : "Selesaikan"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="md:w-full w-[350px] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center mb-3">
            {buttonName !== "Selesai"
              ? "Apakah Anda Ingin Menyelesaikan?"
              : "Apakah Anda Tidak Ingin Menyelesaikan?"}
          </AlertDialogTitle>
          <AlertDialogDescription className="flex justify-center">
            <HelpCircle size={60} color="orange" />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full mt-3">
          <div className="flex md:flex-row flex-col-reverse justify-center w-full gap-x-3 items-center md:gap-y-0 gap-y-1">
            <div className="w-full">
              <AlertDialogCancel className="w-full">Batal</AlertDialogCancel>
            </div>
            <div className="w-full">
              <AlertDialogAction
                className="w-full"
                onClick={handleChangeStatus}
              >
                {buttonName !== "Selesai"
                  ? "Ya, Selesaikan"
                  : "Ya, Jangan Selesaikan"}
              </AlertDialogAction>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const CardList = ({
  data,
  getAllTamu,
  getSumAmountSelesai,
  getSumAmountBelumSelesai,
}) => {
  const handleChangeStatus = async (dataItem) => {
    try {
      const obj = {
        status: dataItem.status,
      };

      const response = await fetch(
        `${apiGuest}/change-status/${dataItem.guestId}`,
        {
          method: "PATCH",
          body: JSON.stringify(obj),
        }
      );

      const result = await response.json();
      // if (result.data[0] === 1) {
      // }
      console.log(result);
      setTimeout(() => {
        getAllTamu();
        getSumAmountSelesai();
        getSumAmountBelumSelesai();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
  const name = data.name;
  const names = name.split(" ");
  const alias = names.map((name) => name.charAt(0));
  const hasil = alias.join("");

  return (
    <div>
      <div className="bg-white px-7 py-9 border border-slate-300 flex sm:flex-row flex-col justify-between items-center rounded-md">
        <div className="flex sm:flex-row flex-col items-center gap-4">
          <div className="w-[92px] h-[76px] bg-gray-300 rounded-lg flex justify-center items-center font-bold text-xl">
            {hasil}
          </div>
          <div className="flex sm:flex-row flex-col-reverse gap-5 sm:text-start text-center justify-center items-center md:items-start">
            <div>
              <h3 className="text-xl font-bold">{data.name}</h3>
              <h6>{data.address}</h6>
            </div>
            <div>
              {data.status === "Selesai" ? (
                <Status
                  color="colorSuccess"
                  text="Selesai" // Gunakan kelas utilitas warna
                />
              ) : (
                <Status text="Belum Selesai" color="colorFailed" />
              )}
            </div>
          </div>
        </div>
        <div className="sm:w-fit w-full sm:text-start text-center">
          <h4 className="mb-5">Rp{data.amount.toLocaleString("id-ID")}</h4>
          <ButtonChangeStatus
            buttonName={data.status}
            handleChangeStatus={() => handleChangeStatus(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default CardList;
