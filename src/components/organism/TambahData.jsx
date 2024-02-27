import React from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const TambahData = ({formik}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary" className="text-white">
          + Tambah Data
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle>Tambah Data</DialogTitle>
          <hr />
          <DialogDescription>
            <div className="flex flex-col items-start gap-y-2">
              <label htmlFor="nama">Nama</label>
              <Input
                id="nama"
                type="text"
                placeholder="Masukkan Nama....."
                autocomplete="off"
                name="name"
                onChange={formik.handleChange}
              />
              <span className="text-red-600">{formik.errors.name}</span>
            </div>
            <div className="mt-5 flex flex-col items-start gap-y-2">
              <label htmlFor="nam">Alamat</label>
              <Input
                id="alamat"
                type="text"
                placeholder="Masukkan Alamat....."
                autocomplete="off"
                name="address"
                onChange={formik.handleChange}
              />
              <span className="text-red-600">{formik.errors.address}</span>
            </div>
            <div className="mt-5 flex flex-col items-start gap-y-2">
              <label htmlFor="nominal">Nominal</label>
              <Input
                id="nominal"
                type="number"
                placeholder="Masukkan Nominal....."
                autocomplete="off"
                name="amount"
                onChange={formik.handleChange}
              />
              <span className="text-red-600">{formik.errors.amount}</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline" className="w-full mt-3 md:mt-0">
              Batal
            </Button>
          </DialogClose>
          <Button onClick={formik.handleSubmit} type="submit">
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TambahData;
