import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { data: session } = useSession();
  const [list, setList] = useState([]);

  const getMyPlaylists = async () => {
    const res = await fetch("/api/playlists");
    const { items }: any = await res.json();
    setList(items);
  };
  return (
    <>
      <Head>
        <title>Spotify next app</title>
        <meta name="description" content="A next app with spotify data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {session ? (
          <>
            Signed in...{session.token.name}
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
