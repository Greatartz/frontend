import { IPFINDER } from "../../../../config";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const dd = await fetch(`https://api.ipregistry.co/?key=${IPFINDER}`);
    const result = await dd.json();
    return res.status(200).json({ code: result?.location?.country?.code });
  }
}
