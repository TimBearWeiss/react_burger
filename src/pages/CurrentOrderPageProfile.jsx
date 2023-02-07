import { useNavigate, useParams } from "react-router-dom";
import { WS_URL } from "../utils/api";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../services/actions/wsAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateToken } from "../services/actions/user";
import { getCookie } from "../utils/data";

// я не понимаю, почему не могу получить accessToken, для того, чтобы отрисовать пейдж.

function CurrentOrderPageInProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  let accessToken = useSelector((store) => store.user.accessToken);

  // useEffect(() => {
  //   dispatch(updateToken("token", getCookie("token")));
  // }, [dispatch]);

  // console.log(accessToken);

  useEffect(() => {
    dispatch(
      wsConnectionStart(`${WS_URL}?token=${accessToken.split("Bearer ")[1]}`)
    );
    return () => dispatch(wsConnectionClosed());
  }, [dispatch]);

  return (
    <>
      <p>PageofProfileIngredient</p>
    </>
  );
}

export default CurrentOrderPageInProfile;
