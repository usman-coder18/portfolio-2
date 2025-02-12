export default function handler(req, res) {
    if (req.method === "POST") {
      return res.status(200).json({ message: "Message sent successfully!" });
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  }
  