addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/api/games" && request.method === "GET") {
    const search = url.searchParams.get("search") || "";
    const games = await searchSteamGames(search);
    return new Response(JSON.stringify(games), {
      headers: { "Content-Type": "application/json" },
    });
  } else if (path.startsWith("/api/games/") && request.method === "GET") {
    const appId = path.split("/").pop();
    const gameData = await getSteamGame(appId);
    if (gameData) {
      return new Response(JSON.stringify(gameData), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({ error: "Game not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } else if (path === "/api/stats" && request.method === "GET") {
    const stats = await getStats();
    return new Response(stats, { headers: { "Content-Type": "text/html" } });
  } else {
    return new Response(
      "<html><body>Not Found</body></html>",
      {
        status: 404,
        headers: { "Content-Type": "text/html" },
      }
    );
  }
}

async function searchSteamGames(search) {
  // Example implementation of a game search (use appropriate logic or API endpoint)
  const mockGames = [
    { id: 1, name: "Example Game", slug: "example-game" },
    { id: 2, name: "Another Game", slug: "another-game" },
  ];

  const results = mockGames.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  return {
    count: results.length,
    results: results.map((game) => ({
      id: game.id,
      slug: game.slug,
      name: game.name,
      background_image: `https://example.com/${game.slug}.jpg`, // Mock image URL
    })),
  };
}

async function getSteamGame(appId) {
  const steamApiUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}`;
  const apiKey = "YOUR API KEY"; // If needed for authorization
  const headers = {
    "Authorization": `Bearer ${apiKey}`, // Include if required
    "User-Agent": "CloudflareWorker/1.0", // Set a custom user-agent
  };

  try {
    const response = await fetch(steamApiUrl, { headers });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const contentType = response.headers.get("Content-Type");
    if (!contentType.includes("application/json")) {
      throw new Error("Received non-JSON response");
    }

    const data = await response.json();
    return data[appId.toString()]; // Correct the key to ensure it's a string
  } catch (error) {
    console.error(`Error fetching Steam game data: ${error.message}`);
    return null; // Return null on failure
  }
}

async function getStats() {
  // Example implementation for a stats endpoint (mock data for demonstration)
  return `
    <head>
      <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css'/>
    </head>
    <body>
      <h1>Server Stats</h1>
      <p>No stats are available at this time.</p>
    </body>
  `;
}
