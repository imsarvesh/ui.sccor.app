// redirect to login page
import { Redirect } from "expo-router";

export default function Profile() {
  return <Redirect href="/login" />;
}
