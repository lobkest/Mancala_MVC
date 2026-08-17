

const BASE_URL = 'http://localhost:8080/api';

export async function startNewGame() {
  const response = await fetch(`${BASE_URL}/start`);
  
  if (!response.ok) {
    throw new Error("Kon het startbord niet ophalen");
  }
  
  return await response.json();
}

export async function playPit(pitIndex: number) {
  const response = await fetch(`${BASE_URL}/move/${pitIndex}`, {
    method: 'POST'
  });

  // Jouw specifieke error-afhandeling verplaatst naar de API
  if (!response.ok) {
    const errorText = await response.text(); 
    throw new Error(`Code: ${response.status}. Bericht van Java: ${errorText}`);
  }

  return await response.json();
}