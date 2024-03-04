import { FormWrapper } from "./FormWrapper";

type AddressData = {
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
};

type AddressFormProps = AddressData & {
  updateFields: (fields: Partial<AddressData>) => void;
};

export function AddressForm({
  province,
  district,
  sector,
  cell,
  village,
  updateFields,
}: AddressFormProps) {
  const inputDiv = `w-full mt-8 flex justify-center items-start flex-col w-full`;
  const inputStyle = `outline-none border-b border-black w-[90%] m-auto py-2 px-4 text-sm text-black text-xs bg-transparent autofill:none`;
  return (
    <FormWrapper title="Enter your home address">
      <div className={inputDiv}>
        <input
          autoFocus
          required
          type="text"
          className={inputStyle}
          placeholder="Province"
          value={province}
          onChange={(e) => updateFields({ province: e.target.value })}
        />
      </div>

      <div className={inputDiv}>
        <input
          required
          type="text"
          className={inputStyle}
          placeholder="District"
          value={district}
          onChange={(e) => updateFields({ district: e.target.value })}
        />
      </div>

      <div className={inputDiv}>
        <input
          required
          type="text"
          className={inputStyle}
          placeholder="Sector"
          value={sector}
          onChange={(e) => updateFields({ sector: e.target.value })}
        />
      </div>

      <div className={inputDiv}>
        <input
          required
          type="text"
          className={inputStyle}
          placeholder="Cell"
          value={cell}
          onChange={(e) => updateFields({ cell: e.target.value })}
        />
      </div>
      <div className={inputDiv}>
        <input
          required
          type="text"
          className={inputStyle}
          placeholder="Village"
          value={village}
          onChange={(e) => updateFields({ village: e.target.value })}
        />
      </div>
    </FormWrapper>
  );
}
