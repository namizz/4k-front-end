import EditIcon from "./EditIcon";
import Deletor from "./Delete";
import React from "react";
const Card = (props) => {
  const [isDeleted, setIsDeleted] = React.useState(false);

  const handleDeleteSuccess = () => {
    setIsDeleted(true);
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="border border-t-0 border-card-blue w-card h-[17vw] m-3 rounded-card-radius relative">
      <div className="bg-gradient-to-b from-[#8899AF] to-card-blue  h-1/3 w-[101%] rounded-t-card-radius flex -mx-[0.5%] ">
        <div className="my-[4%] px-[10%] justify-start text-[0.9vw] text-gray-50">
          {props.church || "prayer"}
        </div>
        <div className=" group m-2 text-sm text-right absolute top-[2%] right-[4%] ">
          <Deletor phone={props.phone} onDeleteSuccess={handleDeleteSuccess} />
        </div>
      </div>
      <hr className="z-10 bg-white h-1 absolute w-full -left-[1px]  border-b-[1.8px] border-card-blue" />
      <hr className="z-10 bg-white h-1 absolute w-full left-[0.5px] border-b-[1.8px] border-card-blue" />

      <div className="z-20 h-round w-2/6  rounded-full absolute left-1/3 bottom-[40%]">
        <img
          src={
            props.img ||
            "https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp"
          }
          alt="pic"
          className="rounded-full border-[3px] border-white w-full h-full object-fill"
        />
      </div>
      <div className="w-full h-1/6 flex justify-between border-t-2 border-blue-950 px-2">
        <div className="text-gray-300 text-[0.9vw]">
          {props.country ? props.country : "ET"}
        </div>
        <div className="">
          <EditIcon width="10vw" />
        </div>
      </div>
      <div className=" w-full  flex ">
        <div className=" w-3/5 m-4 mt-[1.5vw] mb-0 flex-col">
          {" "}
          <p className="text-cardtext text-textc font-semibold w-full whitespace-nowrap overflow-hidden text-ellipsis">
            Name: {props.firstname} {props.lastname}
          </p>
          <p className="text-cardtext text-textc font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {" "}
            Dept: {props.dept}
          </p>
        </div>
        <div className="w-2/5 pt-4 ">
          <p className="text-cardtext text-textc font-semibold">
            {" "}
            Batch: <span className="text-or">{props.batch}</span>
          </p>
          <div className="w-[110%] right-[8%] bg-[#FFB236] h-2/5 relative">
            {props.faverse ? (
              <p className="text-white px-[0.4em] text-[clamp(10px,1.1vw,1em)] w-auto whitespace-nowrap overflow-hidden text-ellipsis">
                {props.faverse}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="mx-4">
        {props.email ? (
          <p className="text-cardtext text-textc font-semibold w-full whitespace-nowrap overflow-hidden text-ellipsis">
            email: <span className=" text-or">{props.email}</span>
          </p>
        ) : null}
      </div>
      <div className=" flex  flex-col items-center">
        {props.phone ? (
          <div className=" text-[1.1vw] text-textc  font-semibold">
            Phone: <span className="text-or">{props.phone}</span>
          </div>
        ) : null}
        <div className="absolute right-[12%] bottom-0 text-[0.7vw] mr-[2%] text-or group">
          <p className="group-hover:text-blue-700">more...</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
