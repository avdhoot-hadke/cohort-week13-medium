export default function Input({
  label,
  type,
  placeholder,
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mt-4">
      <label className="block font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="ps-2 mt-2 w-72 h-10 border rounded-md shadow-sm focus:outline focus:outline-1 focus:outline-gray-400"
      />
    </div>
  );
}
