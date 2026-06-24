const generateJoinCode = (hostelName) => {

  const prefix = hostelName
    .replace(/[^a-zA-Z ]/g, "")
    .trim()
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);

  const randomNumber =
    Math.floor(1000 + Math.random() * 9000);

  return `${prefix}-${randomNumber}`;
};

export default generateJoinCode;