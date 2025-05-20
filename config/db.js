import { drizzle } from 'drizzle-orm/neon-http';
const db = drizzle("postgresql://neondb_owner:npg_KU2ZygrBT6bE@ep-snowy-wildflower-a1i4peyb-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require");

export {db}