import React from "react";
import CardList from "../../CardList";

const SectionBelumSelesai = ({
  dataTamu,
  getAllTamu,
  getSumAmountBelumSelesai,
  getSumAmountSelesai,
}) => {
  const filterData = dataTamu.filter((key) => key.status === "Belum Selesai");
  return (
    <div className="grid gap-y-4">
      {dataTamu &&
        filterData.map((data, i) => (
          <CardList
            key={i}
            index={i}
            data={data}
            getAllTamu={getAllTamu}
            getSumAmountBelumSelesai={getSumAmountBelumSelesai}
            getSumAmountSelesai={getSumAmountSelesai}
          />
        ))}
    </div>
  );
};

export default SectionBelumSelesai;
