export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      source,
      name,
      phone,
      date,
      time,
      service,
      note
    } = req.body;

    const formData = new URLSearchParams();
    formData.append("source", source);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("service", service);
    formData.append("note", note);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxfXUWz87yrJEEa3oKjt_q1jkmpp1spAkT1t-OsiYE4RXYEgcXUktgOuw8j6ulGh_mxxg/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
      });

      const text = await response.text();
      return res.status(200).send(text);
    } catch (error) {
      return res.status(500).json({ error: "Gửi tới Google Apps Script thất bại", details: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
