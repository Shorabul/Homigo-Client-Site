export function splitName(fullName) {
    const parts = fullName.trim().split(" ").filter(Boolean);
    const firstName = parts[0] || "";
    const lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";
    return { firstName, lastName };
}
