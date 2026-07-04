const VISITED_KEY = "yc.visited";
const DISCOVERED_KEY = "yc.discovered";
const COMPLETE_KEY = "yc.complete";

export function isVisited(): boolean {
  try {
    return localStorage.getItem(VISITED_KEY) === "1";
  } catch {
    return false;
  }
}

export function setVisited() {
  try {
    localStorage.setItem(VISITED_KEY, "1");
  } catch {
    // ignore
  }
}

export function getDiscovered(): Set<string> {
  try {
    const raw = localStorage.getItem(DISCOVERED_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function saveDiscovered(set: Set<string>) {
  try {
    localStorage.setItem(DISCOVERED_KEY, JSON.stringify(Array.from(set)));
  } catch {
    // ignore
  }
}

export function isComplete(): boolean {
  try {
    return localStorage.getItem(COMPLETE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setComplete() {
  try {
    localStorage.setItem(COMPLETE_KEY, "1");
  } catch {
    // ignore
  }
}

export function clearAll() {
  try {
    localStorage.removeItem(VISITED_KEY);
    localStorage.removeItem(DISCOVERED_KEY);
    localStorage.removeItem(COMPLETE_KEY);
  } catch {
    // ignore
  }
}
