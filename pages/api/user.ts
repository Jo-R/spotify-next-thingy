import { getUserDetails } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

// TODO can type the responses with <> on reponse
// TODO handle !data case
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session) {
    const response = await getUserDetails(session.token.accessToken);
    const user = await response.json();

    return res.status(200).json(user);
  }
};

export default handler;
