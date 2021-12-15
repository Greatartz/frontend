import { IPFINDER } from "../../../../config";
const requestIp = require("request-ip");

export default async function handler(req, res) {
  if (req.method == "POST") {
    const ipaddress = requestIp.getClientIp(req);
    console.log("yes ip", ipaddress);
    const dd = await fetch(
      `https://api.ipregistry.co/${ipaddress}?key=${IPFINDER}`
    );
    const result = await dd.json();
    console.log("user agent", result?.location?.country?.code);
    return res.status(200).json({ code: result?.location?.country?.code });
  }
}
