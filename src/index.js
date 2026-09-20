const JSON_HEADERS = {
  "content-type": "application/json; charset=UTF-8",
  "cache-control": "no-store",
};

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      ...JSON_HEADERS,
      ...(init.headers || {}),
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return json({
        ok: true,
        service: "akcbmc-conference-2027",
      });
    }

    if (url.pathname === "/api/config") {
      return json({
        registrationFormUrl: env.REGISTRATION_FORM_URL || "",
      });
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ error: "Not found" }, { status: 404 });
    }

    // Static Assets binding. In normal operation matching assets are served
    // directly by Cloudflare; this fallback also handles unmatched requests.
    return env.ASSETS.fetch(request);
  },
};
