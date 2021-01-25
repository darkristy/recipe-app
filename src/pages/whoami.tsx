import { useQuery } from "@apollo/client";
import { NextPage } from "next";

import { withApollo } from "../lib/withApollo";
import { WhoAmIQuery } from "../graphql/queries/authQueries";

const WhoAmI: NextPage = () => {
	const { data, error, loading } = useQuery(WhoAmIQuery);
	if (data) {
		console.log(data);
	}

	if (error) {
		console.log(error);
	}

	if (loading) {
		return <p>Loading...</p>;
	}

	return <p> your user id is: {data?.whoami.id}</p>;
};

export default withApollo(WhoAmI);
