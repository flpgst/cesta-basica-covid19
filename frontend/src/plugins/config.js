import prod from "../../config-prod.json";
import dev from "../../config-dev.json";

const config = process.env.NODE_ENV === "production" ? prod : dev;
export default config;
