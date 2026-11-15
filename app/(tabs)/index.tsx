import { Redirect } from 'expo-router';
// automatically directs user to main menu page
export default function Index() {
  return <Redirect href="/mainmenuName" />;

}