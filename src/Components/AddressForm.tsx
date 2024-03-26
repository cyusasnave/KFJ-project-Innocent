import { FormWrapper } from "./FormWrapper";

type AddressData = {
  cell: string;
  created_at: string;
  cv_url: string;
  district: string;
  first_name: string;
  id: string;
  last_name: string;
  phone: string;
  profile_url: string;
  province: string;
  sector: string;
  user_id: string;
  user_specialization: string;
  village: string;
};

type AddressFormProps = AddressData & {
  updateFields: (fields: Partial<AddressData>) => void;
};

export function AddressForm({
  cell,
  created_at,
  cv_url,
  district,
  first_name,
  id,
  last_name,
  phone,
  profile_url,
  province,
  sector,
  user_id,
  user_specialization,
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
      <div className={inputDiv}>
        <input
          required
          type="number"
          className={inputStyle}
          placeholder="Phone"
          value={phone}
          onChange={(e) => updateFields({ phone: e.target.value })}
        />
      </div>
    </FormWrapper>
  );
}
