const FormTextInput = ({ label, placeholder, type }) => {
  return (
    <div className="my-5 flex flex-col gap-2">
      <label className="text-lg font-bold text-gray-600">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className=" border border-gray-600 rounded px-2 py-1 text-gray-600"
      />
    </div>
  );
};
export default FormTextInput;
