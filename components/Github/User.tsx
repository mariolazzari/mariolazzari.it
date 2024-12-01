import { UserProps } from "./UserProps";

export function User({ user }: UserProps) {
  return <div>User: {user.name}</div>;
}
