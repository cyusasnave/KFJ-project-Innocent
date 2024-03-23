import { FormWrapper } from "./FormWrapper";

type UserData = {
  // cell: string;
  created_at: string;
  cv_url: string;
  // district: string;
  first_name: string;
  id: string;
  last_name: string;
  // phone: string;
  profile_url: string;
  // province: string;
  // sector: string;
  user_id: string;
  user_specialization: string;
  // village: string;
};

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

export function UserForm({
  // cell,
  created_at,
  cv_url,
  // district,
  first_name,
  id,
  last_name,
  // phone,
  profile_url,
  // province,
  // sector,
  user_id,
  user_specialization,
  // village,
  updateFields,
}: UserFormProps) {
  const inputDiv = `w-full mt-8 flex justify-center items-start flex-col w-full`;
  const inputStyle = `outline-none border-b border-black w-[90%] m-auto py-2 px-4 text-sm text-black text-xs bg-transparent autofill:none`;

  return (
    <FormWrapper title="Personal Information">
      <div className={inputDiv}>
        <input
          required
          type="text"
          className={inputStyle}
          placeholder="First Name"
          value={first_name}
          onChange={(e) => updateFields({ first_name: e.target.value })}
        />
      </div>
      <div className={inputDiv}>
        <input
          required
          min={1}
          type="text"
          className={inputStyle}
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => updateFields({ last_name: e.target.value })}
        />
      </div>
      <div className={inputDiv}>
        <label
          htmlFor=""
          className="w-[90%] m-auto text-sm mb-3 text-black pl-2"
        >
          Specilatization:
        </label>
        <input
          required
          min={1}
          type="text"
          className={inputStyle}
          placeholder="Birth date"
          value={user_specialization}
          onChange={(e) => updateFields({ user_specialization: e.target.value })}
        />
      </div>
      {/* <div className={inputDiv}>
        <input
          required
          type="text"
          className={inputStyle}
          placeholder="National ID"
          value={NId}
          onChange={(e) => updateFields({ NId: e.target.value })}
        />
      </div> */}
      <div className={inputDiv}>
      <label
          htmlFor=""
          className="w-[90%] m-auto text-sm mb-3 text-black pl-2"
        >
          Upload your CV:
        </label>
        <input
          autoFocus
          required
          type="file"
          className={inputStyle}
          placeholder="First Name"
          value={CV}
          onChange={(e) => updateFields({ CV: e.target.value })}
        />
      </div>
    </FormWrapper>
  );
}
