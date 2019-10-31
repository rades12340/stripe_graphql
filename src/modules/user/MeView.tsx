import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import * as React from "react";
import { ME_QUERY, ME_QUERY_me } from "src/schemaTypes";

const ME = gql`
  {
    me {
      id
      email
    }
  }
`;

const MeView: React.FC = () => {
  // const [data, setUser] = React.useState();
  const { loading, data } = useQuery<ME_QUERY, ME_QUERY_me>(ME);

  // React.useEffect(() => {
  //   setUser(data);
  // }, [data]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <h1>Data is endefined</h1>;
  }

  if (!data.me) {
    return <h1>No User</h1>;
  }

  return <div>{data.me.email && data.me.email}</div>;
};

export default MeView;
