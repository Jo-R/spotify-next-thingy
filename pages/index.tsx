import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

// TODO ts types anys and errors!
export default function Home() {
  const { data: session } = useSession();
  const [list, setList] = useState([]);
  const [user, setUser] = useState<any>(null);

  // TODO anyway, how do I do this fetch stuff  properly in next??
  const getMyPlaylists = async () => {
    const res = await fetch("/api/playlists");
    const { items }: any = await res.json();
    setList(items);
  };

  const getUser = async () => {
    const res = await fetch("/api/user");
    const data: any = await res.json();
    console.log(data);
    setUser(data);
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);
  return (
    <>
      <Head>
        <title>Spotify next app</title>
        <meta name="description" content="A next app with spotify data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {session && user ? (
          <>
            Signed in as {user.display_name}
            <img src={user.images[0].url} width="100"></img>
            <br />
            <button onClick={() => signOut()}>Sign out</button>
            <hr />
            <button onClick={() => getMyPlaylists()}>
              Get all my playlists
            </button>
            {list.map((item: any) => (
              <div key={item.id}>
                <h1>{item.name}</h1>
                <img src={item.images[0]?.url} width="100" />
              </div>
            ))}
          </>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </main>
    </>
  );
}
