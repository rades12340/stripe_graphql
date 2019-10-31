import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import * as React from "react";
import { Login, LoginVariables } from "src/schemaTypes";

interface Props {
  history: any;
}

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      id
    }
  }
`;

const LoginView: React.FC<Props> = ({ history }) => {
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [login, { data }] = useMutation<Login, LoginVariables>(LOGIN_USER, {
    // tslint:disable-next-line:no-shadowed-variable
    onCompleted: ({ login }) => {
      console.log(login);
    }
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login({
      variables: { email: user.email, password: user.password }
    });
    setUser({ email: "", password: "" });
    history.push("/me");
  };
  console.log(data);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="email"
          placeholder="Name"
          value={user.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginView;
