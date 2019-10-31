import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import * as React from "react";
import { Register, RegisterVariables } from "src/schemaTypes";

const REGISTER_USER = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

const RegisterView: React.FC = props => {
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [register, { data }] = useMutation<Register, RegisterVariables>(
    REGISTER_USER
  );

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    register({
      variables: { email: user.email, password: user.password }
    });
    setUser({ email: "", password: "" });
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterView;
