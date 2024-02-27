import { Input } from "../ui/input";
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
import { useState } from "react";
import { notify } from "@/lib/utils";

const ButtonEdit = ({ id, getAllGuests }) => {
  const [nameEdit, setNameEdit] = useState("");
  const [amountEdit, setAmountEdit] = useState("");
  const [addressEdit, setAddressEdit] = useState("");

  const getGuestById = async () => {
    try {
      if (id) {
        const response = await fetch(`${apiGuest}/${id}`, {
          method: "GET",
        });
        const data = await response.json();
        setNameEdit(data.data[0].name);
        setAddressEdit(data.data[0].address);
        setAmountEdit(data.data[0].amount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateGuestById = async () => {
    try {
      const obj = {
        name: nameEdit,
        address: addressEdit,
        amount: parseInt(amountEdit),
      };

      const response = await fetch(`${apiGuest}/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          credentials: true,
        },
        body: JSON.stringify(obj),
      });

      const data = await response.json();
      notify("Berhasil Ubah Data", 800, "success", "colored");
      getAllGuests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="text-white" onClick={getGuestById}>
          Edit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="md:w-full w-[350px] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Tamu</AlertDialogTitle>
          <hr />
          <AlertDialogDescription>
            <div className="flex flex-col items-start gap-y-2">
              <label htmlFor="nam">Nama</label>
              <Input
                id="nama"
                type="text"
                autocomplete="off"
                value={nameEdit}
                onChange={(e) => setNameEdit(e.target.value)}
              />
            </div>
            <div className="mt-5 flex flex-col items-start gap-y-2">
              <label htmlFor="nam">Alamat</label>
              <Input
                id="alamat"
                type="text"
                autocomplete="off"
                value={addressEdit}
                onChange={(e) => setAddressEdit(e.target.value)}
              />
            </div>
            <div className="mt-5 flex flex-col items-start gap-y-2">
              <label htmlFor="nominal">Nominal</label>
              <Input
                id="nominal"
                type="number"
                autocomplete="off"
                value={amountEdit}
                onChange={(e) => setAmountEdit(e.target.value)}
              />
            </div>
            <hr className="mt-4" />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <Button onClick={updateGuestById}>Simpan</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonEdit;
