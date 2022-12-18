import { getUsersPlaylists } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

// TODO can type the responses with <> on reponse
// TODO handle !data case
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session) {
    const response = await getUsersPlaylists(session.token.accessToken);
    const { items } = await response.json();

    return res.status(200).json({ items });
  }
};

export default handler;
