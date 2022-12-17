import { getUserDetails } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    token: { accessToken },
  } = await getSession({ req });
  const response = await getUserDetails(accessToken);
  const data = await response.json();

  return res.status(200).json(data);
};

export default handler;
