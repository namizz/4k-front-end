const FilterBox = (props) => {
  return (
    <div
      className="px-2 py-1 mr-1 border border-[#62A3E0] text-[#5b8ecf] font-semibold rounded-xl bg-gradient-to-tl from-blue-100 to-white"
      onClick={props.onClick}
    >
      {props.dept || "Department"}
    </div>
  );
};
export default FilterBox;
