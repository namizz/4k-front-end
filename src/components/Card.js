const Card = () => {
  return (
    <div className="border border-card-blue w-1/3 h-80p m-3 rounded-card-radius flex justify-center relative">
      <div className="bg-card-blue  h-1/3 w-full rounded-t-card-radius"></div>
      <div className="bg-green-300 h-3/6 w-2/6 border-2 rounded-full absolute "></div>
    </div>
  );
};

export default Card;
