import { useEffect, type FC } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { loadUser } from "../../reducers/user/auth.action";

const LoadUserWrapper: FC = () => {
	const dispatch: AppDispatch = useDispatch();
	useEffect(() => {
		loadUser(dispatch);
	}, [dispatch]);

	return null;
};

export default LoadUserWrapper;
