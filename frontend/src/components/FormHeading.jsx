const FormHeading = ({ title, subTitle }) => {
  return (
    <div className="text-center mt-3 mb-4">
      <h2 className="font-bold text-4xl mb-4">{title}</h2>
      <p className="text-gray-500 font-semibold text-xl">{subTitle}</p>
    </div>
  );
};
export default FormHeading;
