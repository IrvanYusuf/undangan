import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ButtonDelete from "./ButtonDelete";
import ButtonEdit from "./ButtonEdit";
import Status from "./Status";

const ExpendedComponents = ({ data,getAllGuests }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Detail</CardTitle>
          <div className="flex gap-x-2">
            <ButtonDelete id={data.Id} getAllGuests={getAllGuests}/>
            <ButtonEdit id={data.Id} getAllGuests={getAllGuests}/>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <div className="flex">
          <span className="w-[100px]">Nama</span>
          <span>:</span>
          <span className="ms-2">{data.Nama}</span>
        </div>
        <div className="flex">
          <span className="w-[100px]">Nominal</span>
          <span>:</span>
          <span className="ms-2">Rp{data.Nominal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex">
          <span className="w-[100px]">Alamat</span>
          <span>:</span>
          <span className="ms-2">{data.Alamat}</span>
        </div>
        <div className="flex">
          <span className="w-[100px]">Status</span>
          <span>:</span>
          <span className="ms-2">
            <Status text={data.Status} />
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpendedComponents;
