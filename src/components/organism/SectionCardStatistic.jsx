import Card from "@/Card";
import React from "react";
import Tamu from "../../assets/tamu.png";
import Selesai from "../../assets/selesai.png";
import BelumSelesai from "../../assets/list.png";

const SectionCardStatistic = ({
  totalTamu,
  totalBelumSelesai,
  totalSelesai,
}) => {
  return (
    <div className="grid sm:grid-cols-3 md:gap-[35px] gap-[20px]">
      <Card
        value={`${
          totalTamu === null ? "loading...." : `${totalTamu && totalTamu}`
        }`}
        title={"Total Tamu Undangan"}
        icon={Tamu}
      />
      <Card
        // value={`${isLoading && (Rp${totalSelesai && totalSelesai.toLocaleString("id-ID"))}}`}
        value={`${
          totalSelesai === null
            ? "loading...."
            : `Rp.${
                totalSelesai && parseInt(totalSelesai).toLocaleString("id-ID")
              }`
        }`}
        title={"Total Selesai"}
        icon={Selesai}
      />
      <Card
        value={`${
          totalBelumSelesai === null
            ? "loading...."
            : `Rp.${
                totalBelumSelesai &&
                parseInt(totalBelumSelesai).toLocaleString("id-ID")
              }`
        }`}
        title={"Total Belum Selesai"}
        icon={BelumSelesai}
      />
    </div>
  );
};

export default SectionCardStatistic;
