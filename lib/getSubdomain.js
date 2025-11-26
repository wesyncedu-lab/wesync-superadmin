export function getSubdomain() {
  if (typeof window === "undefined") return null;

  const host = window.location.host;  
  if (!host.includes(".")) return null;

  // Example: dps.wesync.cc → dps
  const parts = host.split(".");

  // Remove main domain (wesync.cc)
  if (parts.length === 3) {
    return parts[0]; 
  }

  return null;
}
