import { getUserDetails } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getSession({ req });
  if (data) {
    const response = await getUserDetails(data.token.accessToken);
    const user = await response.json();

    return res.status(200).json(user);
  }
};

export default handler;
