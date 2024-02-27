import { Trash2 } from "lucide-react";

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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { apiGuest } from "@/api/api";
import { notify } from "@/lib/utils";
const ButtonDelete = ({ id, getAllGuests }) => {
  const deleteGuestById = async () => {
    try {
      const response = await fetch(`${apiGuest}/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      notify("Berhasil Hapus Data", 800, "success", "colored");
      getAllGuests();
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-600 hover:bg-red-700">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="md:w-full w-[350px] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center mb-3">
            Apakah Anda Ingin Menghapus Data Ini?
          </AlertDialogTitle>
          <AlertDialogDescription className="flex justify-center">
            <Trash2 size={60} color="red" />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full mt-3">
          <div className="flex md:flex-row flex-col-reverse justify-center w-full gap-x-3 items-center md:gap-y-0 gap-y-1">
            <div className="w-full">
              <AlertDialogCancel className="w-full">Batal</AlertDialogCancel>
            </div>
            <div className="w-full">
              <AlertDialogAction
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={deleteGuestById}
              >
                Hapus
              </AlertDialogAction>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonDelete;
