const Deletor = (props) => {
  const Click = () => {
    fetch(`http://localhost:4000/4kfellowhship?phone=${props.phone}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          props.onDeleteSuccess(); // Notify parent that delete was successful
        } else {
          console.log("Delete failed");
        }
      })
      .catch((error) => {
        console.log("Error during deletion:", error);
      });

    console.log("send to backend");
  };

  return (
    <img
      src="https://static.vecteezy.com/system/resources/thumbnails/034/553/563/small_2x/trash-sign-symbol-button-flat-design-png.png"
      alt="delete"
      width="35vw"
      className="opacity-10 group-hover:opacity-95 transition-opacity duration-300 object-cover"
      onClick={Click}
    />
  );
};

export default Deletor;
