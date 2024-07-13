type formError = {
  error: String;
};
export const FormValidationError = ({ error }: formError) => {
  return (
    <div>
      <p className="text-red-700">{error}</p>
    </div>
  );
};
