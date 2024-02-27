import React from "react";
import CardList from "../../CardList";

const SectionSelesai = ({
  dataTamu,
  getAllTamu,
  getSumAmountSelesai,
  getSumAmountBelumSelesai,
}) => {
  const filterData = dataTamu.filter((key) => key.status === "Selesai");
  return (
    <div className="grid gap-y-4 grid-cols-1">
      {dataTamu &&
        filterData.map((data, i) => (
          <CardList
            key={i}
            index={i}
            data={data}
            getAllTamu={getAllTamu}
            getSumAmountSelesai={getSumAmountSelesai}
            getSumAmountBelumSelesai={getSumAmountBelumSelesai}
          />
        ))}
    </div>
  );
};

export default SectionSelesai;
