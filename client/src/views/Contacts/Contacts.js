import { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoute } from "../../actions/appActions";

//components
const Contacts = () => {
  // Redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedRoute("/contacts"));
  }, [dispatch]);

  return <div></div>;
};

export default Contacts;
