export const truncateText = (html, limit) => {
  const plainText = html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
  // Truncate text safely
  return plainText.length > limit
    ? plainText.substring(0, limit) + "..."
    : plainText;
};

export const correctTypeNm = (type) => {
  return type
    .split(/[_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" ");
};
