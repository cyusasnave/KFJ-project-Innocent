import { FormWrapper } from "./FormWrapper";

type AccountData = {
  email: string;
  password: string;
  phoneNumber: string;
  confirmPassword: string;
};

type AccountFormProps = AccountData & {
  updateFields: (fields: Partial<AccountData>) => void;
};

export function AccountForm({
  email,
  password,
  phoneNumber,
  confirmPassword,
  updateFields,
}: AccountFormProps) {
  const inputDiv = `w-full mt-8 flex justify-center items-start flex-col w-full`;
  const inputStyle = `outline-none border-b border-black w-[90%] m-auto py-2 px-4 text-sm text-black text-xs !bg-transparent autofill:none`;
  return (
    <FormWrapper title="Account Creation">
      <div className={inputDiv}>
        <input
          autoFocus
          required
          type="text"
          className={inputStyle}
          value={phoneNumber}
          placeholder="Enter your phone number"
          onChange={(e) => updateFields({ phoneNumber: e.target.value })}
        />
      </div>
      <div className={inputDiv}>
        <input
          autoFocus
          required
          type="email"
          className={inputStyle}
          value={email}
          placeholder="Email"
          onChange={(e) => updateFields({ email: e.target.value })}
        />
      </div>
      <div className={inputDiv}>
        <input
          required
          type="password"
          className={inputStyle}
          value={password}
          placeholder="Password"
          onChange={(e) => updateFields({ password: e.target.value })}
        />
      </div>
      <div className={inputDiv}>
        <input
          required
          type="password"
          className={inputStyle}
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => updateFields({ confirmPassword: e.target.value })}
        />
      </div>
    </FormWrapper>
  );
}
