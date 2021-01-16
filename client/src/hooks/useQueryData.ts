// const useQueryData = (
// 	query: string
// ): {
// 	data: any;
// 	fetching: boolean;
// 	error: CombinedError;
// 	reexecuteQuery: (opts?: Partial<OperationContext>) => void;
// } => {
// 	const [result, reexecuteQuery] = useQuery({
// 		query: query,
// 	});
// 	const { data, fetching, error } = result;

// 	return {
// 		data,
// 		fetching,
// 		error,
// 		reexecuteQuery,
// 	};
// };

// export default useQueryData;

import { useState } from "react";
import useSWR from "swr";

import fetcher from "../lib/fetcher";

interface QueryData {
	data: any;
	error: any;
	stale: boolean;
	update: () => void;
}

const useQueryData = (query: string, ...args: any[]): QueryData => {
	const [variables, token] = args;
	const { data, error } = useSWR([query, variables, token], fetcher);
	const [queryData, setQueryData] = useState(data);

	if (data && !queryData) setQueryData(data);

	return {
		data: queryData,
		error,
		stale: queryData !== data,
		update: (): void => setQueryData(data),
	};
};

export default useQueryData;
