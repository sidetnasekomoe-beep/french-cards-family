const UPSTREAM = "https://french-cards-family-r2jdl524h-homework-f571.vercel.app/api/state";

module.exports = async function (req, res) {
  try {
    const options = {
      method: req.method,
      headers: {
        "content-type": "application/json"
      }
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      options.body = JSON.stringify(req.body || {});
    }

    const response = await fetch(UPSTREAM, options);
    const text = await response.text();

    res.status(response.status);
    res.setHeader(
      "content-type",
      response.headers.get("content-type") || "application/json; charset=utf-8"
    );
    res.setHeader("cache-control", "no-store");
    res.send(text);

  } catch (error) {
    res.status(502).json({
      error: "Cloud sync proxy failed"
    });
  }
};
