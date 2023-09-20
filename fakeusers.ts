import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import * as csv from "https://deno.land/std@0.201.0/csv/mod.ts"
import { writeCSV } from "https://deno.land/x/csv/mod.ts";

const COUNT = 2500;

function generateLoginName(fullName: string): string {
    // Remove spaces and convert to lowercase
    let loginName = fullName.replace(/\s+/g, "").toLowerCase();
  
    // Remove special characters
    loginName = loginName.replace(/[^a-z0-9]/g, "");
  
    // Truncate to a reasonable length (e.g., 12 characters)
    if (loginName.length > 12) {
      loginName = loginName.slice(0, 12);
    }
  
    // Add a unique identifier (you can modify this part)
    const uniqueIdentifier = Math.random().toString(36).substr(2, 5);
    loginName += uniqueIdentifier;
  
    return loginName;
  }

// Generate COUNT rows of data
const data = [["loginName","name", "ipAddress", "group"]];
for (let i = 0; i < COUNT; i++) {
  const name = faker.person.fullName();
  const loginName = generateLoginName(name);
  const ipAddress = faker.internet.ipv4();
  const group = getRandomGroup(); // Assign a random group

  data.push([loginName, name, ipAddress, group]);
}

// Function to generate a random group
function getRandomGroup() {
  const groups = ["user", "admin", "audit"];
  const randomIndex = Math.floor(Math.random() * groups.length);
  return groups[randomIndex];
}



const f = await Deno.open("./example.csv", {
    write: true,
    create: true,
    truncate: true,
  });

  
  await writeCSV(f, data);
  
  f.close();