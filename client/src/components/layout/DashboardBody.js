import React, { useState, useEffect } from "react";
import isEmpty from "is-empty";

import { Typography } from '@material-ui/core';

function DashboardBody(props) {
	const [user, setUser] = useState(props.userData);

	useEffect(() => {
    setUser(props.userData);
	}, [props.userData]);

	return (
		<Typography>
			Welcome {!isEmpty(user.firstName) && user.firstName}
		</Typography>
  );
}

export default DashboardBody;