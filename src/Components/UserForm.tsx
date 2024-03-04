import { FormWrapper } from "./FormWrapper";

type UserData = {
  firstName: string;
  lastName: string;
  age: string;
  birthDate: string;
  NId: string;
};

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

export function UserForm({
  firstName,
  lastName,
  age,
  birthDate,
  NId,
  updateFields,
}: UserFormProps) {
  const inputDiv = `w-full mt-8 flex justify-center items-start flex-col w-full`;
  const inputStyle = `outline-none border-b border-black w-[90%] m-auto py-2 px-4 text-sm text-black text-xs bg-transparent autofill:none`;

  return (
    <FormWrapper title="Personal Information">
      <div className={inputDiv}>
        <input
          autoFocus
          required
          type="text"
          className={inputStyle}
          placeholder="First Name"
          value={firstName}
          onChange={(e) => updateFields({ firstName: e.target.value })}
        />
      </div>
      <div className={inputDiv}>
        <input
          required
          type="text"
          className={inputStyle}
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => updateFields({ lastName: e.target.value })}
        />
      </div>
      <div className={inputDiv}>
        <input
          required
          min={1}
          type="number"
          className={inputStyle}
          placeholder="Age"
          value={age}
          onChange={(e) => updateFields({ age: e.target.value })}
        />
      </div>
      <div className={inputDiv}>
        <label
          htmlFor=""
          className="w-[90%] m-auto text-sm mb-3 text-black pl-2"
        >
          Birth Date:
        </label>
        <input
          required
          min={1}
          type="date"
          className={inputStyle}
          placeholder="Birth date"
          value={birthDate}
          onChange={(e) => updateFields({ birthDate: e.target.value })}
        />
      </div>
      <div className={inputDiv}>
        <input
          required
          type="text"
          className={inputStyle}
          placeholder="National ID"
          value={NId}
          onChange={(e) => updateFields({ NId: e.target.value })}
        />
      </div>
    </FormWrapper>
  );
}
